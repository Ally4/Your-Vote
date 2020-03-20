import express from 'express';
import adminJob from '../controllers';
import authenticate, { authorization as authorize } from '../middleware/authenticate';

const adminRouters = express.Router();

adminRouters.get('/', adminJob.welcomeMessage);

adminRouters.patch('/api/v1/party/:partyid', authenticate, adminJob.editParty);

adminRouters.post('/api/v1/vote', authenticate, adminJob.vote);

adminRouters.get('/api/v1/office/:id/result', authenticate, adminJob.result);

adminRouters.get('/api/v1/office/results', authenticate, adminJob.results);

adminRouters.post('/api/v1/parties', authenticate, authorize('Admin'), adminJob.createPoliticalParty);

adminRouters.post('/api/v1/petitions', authenticate, adminJob.createPetition);

adminRouters.post('/api/v1/offices', authenticate, authorize('Admin'), adminJob.createPoliticalOffice);

adminRouters.get('/api/v1/parties/:partyid', authenticate, adminJob.getPartyById);

adminRouters.get('/api/v1/offices/:officeid', authenticate, adminJob.getOfficeById);

adminRouters.get('/api/v1/parties', authenticate, adminJob.getPoliticalParties);

adminRouters.get('/api/v1/offices', authenticate, adminJob.getPoliticalOffices);

adminRouters.post('/api/v1/candidates', authenticate, adminJob.createACandidate);

adminRouters.delete('/api/v1/parties/:partyid', authenticate, adminJob.deletePoliticalParty);

adminRouters.delete('/api/v1/offices/:officeid', authenticate, adminJob.deletePoliticalOffice);

adminRouters.delete('/api/v1/petitions/:petitionid', authenticate, adminJob.deletePetition);


export default adminRouters;
