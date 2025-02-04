import { Request, Response } from 'express';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { globalErrorHandler } from '@hardikgarg2002/node-errorify';
import candidateRoutes from './route';
import { connectMongoDb, isMongoDBConnected } from './utils/mongo';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';


const app = express().use(express.json()).use(cors());
const port = process.env.PORT || 3000;

connectMongoDb();
app.get('/', (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'text/html');
	const response = {
		message: 'Welcome to the CRMS',
        Author:'Hardik Garg',
        dbconnected: isMongoDBConnected(),
	};

	res.send(response);
});
app.use('/api/candidates', candidateRoutes);
// app.use('/user', userRouter);

		// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')))
// app.use(globalErrorHandler);

// default end point
app.use('*', (req, res) => {
	res.status(404).send({
		error: 'AUTH404: Could not find the page requested by you',
	});
});

app.listen(port, () => {
	console.log('App listening on port', port);
});


const disconnectMongoDB = () => {
	mongoose.disconnect();
	console.log('Database disconnected successfully');
};

export function destroyApp(event?: string) {
	console.log('destroying app on event:', event);
	try {
		disconnectMongoDB();
		process.exit(0);
	} catch (error) {
		console.log('Error in destroying app', error);
		process.exit(1);
	}
}

process.on('SIGINT', () => destroyApp('SIGINT'));
process.on('SIGTERM', () => destroyApp('SIGTERM'));
process.on('SIGQUIT', () => destroyApp('SIGQUIT'));
process.on('SIGUSR2', () => destroyApp('SIGUSR2'));
process.on('exit', () => console.log('exit called'));
process.on('uncaughtException', (err) => {
	console.warn('uncaughtException', err);
	// logger.warn('debug', 'Uncaught exception', err);
	// destroyApp('uncaughtException');
});
process.on('unhandledRejection', (reason, promise) => {
	console.warn('unhandledRejection', reason, promise);
	// logger.warn('debug', 'Unhandled Rejection at:', promise, 'reason:', reason);
	// destroyApp('unhandledRejection');
});
