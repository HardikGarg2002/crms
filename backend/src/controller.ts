import { Request, Response } from 'express';
import Candidate, { ICandidate } from './model';
import validatePhoneNumber from './utils/validate_phone';
import { validateCandidateStatus, validateEmail, validateJobTitle, validateName } from './utils/validations';
import { sendMail } from './utils/email';

export default class CandidateController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, phone, jobTitle } = req.body;
      if (!validatePhoneNumber(phone)) {
        throw new Error('Invalid phone number');
      }

      // Validate name
      if (!validateName(name)) {
        throw new Error('Invalid name format')
      }

      // Validate email
      if (!validateEmail(email)) {
        throw new Error('Invalid email format')
      }

      // Validate job title
      if (!validateJobTitle(jobTitle)) {
        throw new Error( 'Invalid job title format' );
      }

      // Validate resume file (if uploaded)
      if (req.file && req.file.mimetype !== 'application/pdf') {
        throw new Error('Only PDF files are allowed' );
      }
      const resumeUrl = req.file ? req.file.path : null;

      const candidate = new Candidate({ name:name.trim(), email:email.trim(), phone, jobTitle:jobTitle.trim(), resumeUrl });
      await candidate.save();
      console.log('new candidate created');
      res.status(201).json({candidate,message:'New candidate Referral added'});
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const candidates = await Candidate.find();
      res.json(candidates);
    } catch (err) {
        // throw new Error('Error in getting candidates');
      res.status(500).json({ error: (err as Error).message });
    }
  }

    async patch(req: Request, res: Response) {
        try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(candidate);
        } catch (err) {
        res.status(400).json({ error: (err as Error).message });
        }
    }

  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      if (!validateCandidateStatus(status?.toUpperCase().trim())) {
        throw new Error('Invalid Status. Only Valid values are: Pending, Reviewed, Hired' );
      }
     
      const candidate = await Candidate.findByIdAndUpdate(req.params.id, { status:status.toUpperCase().trim() }, { new: true });
      if(!candidate) throw new Error('Candidate do not exist with this id');
      let message = 'Candidate status updated successfully';
      if (status.toUpperCase() === 'HIRED') {
        const { success, error } = await sendMail({
            email: candidate.email,
            name: candidate.name,
            jobTitle: candidate.jobTitle
          });
  
          if (!success) {
            console.error('Failed to send email:', error);
            message = 'Candidate status updated to Hired, but failed to send email';
          }
      }
      console.log('candidae status changed to',candidate.status);
      res.json({candidate,message });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await Candidate.findByIdAndDelete(req.params.id);
      res.json({ message: 'Candidate deleted' });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
};