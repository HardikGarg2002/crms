---

## **Candidate Referral Management System**

This project is a **Candidate Referral Management System** that allows users to refer candidates, manage their status, and send emails when a candidate is hired. It consists of a **React frontend** and a **Node.js + Express backend**.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
   - [Backend](#backend)
   - [Frontend](#frontend)
4. [API Documentation](#api-documentation)
5. [Environment Variables](#environment-variables)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Features**
### **Frontend**
- **Dashboard**: Display a list of referred candidates with their details (name, email, job title, status).
- **Referral Form**: Allow users to refer a new candidate with fields for name, email, phone, job title, and resume upload (PDF only).
- **Update Status**: Update a candidate's status (Pending → Reviewed → Hired).
- **Search and Filter**: Filter candidates by job title or status.

### **Backend**
- **API Endpoints**:
  - `POST /candidates`: Add a new candidate.
  - `GET /candidates`: Fetch all candidates.
  - `PUT /candidates/:id/status`: Update a candidate's status.
  - `DELETE /candidates/:id`: Delete a candidate.
- **Email Notification**: Send an email to the candidate when their status is updated to "Hired".
- **Validation**: Validate email, phone number, and resume file format.
- **API docs(Swagger)** : Api docs are present on this url https://crms-wbio.onrender.com/api-docs/

---

## **Technologies Used**
### **Frontend**
- **React**: Frontend library for building user interfaces.
- **Vite**: Build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn/ui**: UI component library for building modern interfaces.
- **React Router**: Client-side routing.

### **Backend**
- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing candidate data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Nodemailer**: Library for sending emails.
- **Multer**: Middleware for handling file uploads.

---

## **Setup and Installation**
### **Backend**
1. Clone the repository:
   ```bash
   git clone https://github.com/HardikGarg2002/crms.git
   cd candidate-referral-system/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/candidates
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-email-password
     ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000`.

---

### **Frontend**
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

---

## **API Documentation**
### **Endpoints**
| Method | Endpoint                | Description                              |
|--------|-------------------------|------------------------------------------|
| POST   | `/candidates`           | Add a new candidate.                     |
| GET    | `/candidates`           | Fetch all candidates.                    |
| PUT    | `/candidates/:id/status`| Update a candidate's status.             |
| DELETE | `/candidates/:id`       | Delete a candidate.                      |

### **Example Requests**
#### **Add a Candidate**
```bash
curl -X POST http://localhost:5000/api/candidates \
-F "name=John Doe" \
-F "email=john.doe@example.com" \
-F "phone=+4915112345678" \
-F "jobTitle=Software Engineer" \
-F "resume=@/path/to/resume.pdf"
```

#### **Update Candidate Status**
```bash
curl -X PUT http://localhost:5000/api/candidates/65a1b2c3d4e5f6a7b8c9d0e1/status \
-H "Content-Type: application/json" \
-d '{"status": "Hired"}'
```

---

## **Environment Variables**
### **Backend**
| Variable         | Description                          | Example Value                     |
|------------------|--------------------------------------|-----------------------------------|
| `PORT`           | Port for the backend server.         | `5000`                           |
| `MONGO_URI`      | MongoDB connection URI.              | `mongodb://localhost:27017/candidates` |
| `EMAIL_USER`     | Email address for sending emails.    | `your-email@gmail.com`           |
| `EMAIL_PASSWORD` | Email password or app-specific password. | `your-email-password`         |

---

## **Deployment**
### **Backend**
- Deploy the backend to a platform like **Render**, **Heroku**, or **Vercel**.
- Set the environment variables in the deployment platform.
- View My backend deployment at: https://crms-wbio.onrender.com/

### **Frontend**
- Build the frontend for production:
  ```bash
  npm run build
  ```
- Deploy the `dist` folder to a platform like **Netlify**, **Vercel**, or **GitHub Pages**.
 View My backend deployment at: https://crms-nine.vercel.app/
---

## **Contributing**
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Let me know if you need further assistance!
