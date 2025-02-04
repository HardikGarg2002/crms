import nodemailer from 'nodemailer';

export const getHiredEmailTemplate = (name: string, jobTitle: string) => {
    return `
      <h1>Congratulations, ${name}!</h1>
      <p>We are pleased to inform you that you have been selected for the position of <strong>${jobTitle}</strong>.</p>
      <p>Welcome to the team!</p>
      <p>Best regards,</p>
      <p>The Hiring Team</p>
    `;
  };


export async function sendMail({email,name,jobTitle}:{email:string,name:string,jobTitle:string}){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Congratulations! You have been hired',
        html: getHiredEmailTemplate(name, jobTitle)
      };    

      try {
        // Attempt to send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true, messageId: info.messageId }; // Return success status
      } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }; // Return error details
      }
    }
