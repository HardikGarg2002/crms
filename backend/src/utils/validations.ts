import multer from 'multer';
import { CandidateStatus } from '../model';


const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

const validateName = (name: string): boolean => {
    const regex = /^[A-Za-z\s'-]{2,50}$/;
    return regex.test(name);
 };

 const validateCandidateStatus = (candidateStatus: CandidateStatus): boolean => {
    return Object.values(CandidateStatus).includes(candidateStatus);
  };

  const validateJobTitle = (jobTitle: string): boolean => {
    const regex = /^[A-Za-z0-9\s\-,/]{2,100}$/;
    return regex.test(jobTitle);
  };

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});


export { validateEmail, validateName, validateCandidateStatus, validateJobTitle };