import express from 'express';
import adminJob from '../controllers/adminController';
import accessibility from '../middleware/accessibility';

const adminRouters = express.Router();

adminRouters.patch('/api/v1/party/:partyid', accessibility, adminJob.editParty);

adminRouters.post('/api/v1/parties', accessibility, adminJob.createPoliticalParty);

adminRouters.post('/api/v1/petitions', accessibility, adminJob.createPetition);

adminRouters.post('/api/v1/offices', accessibility, adminJob.createPoliticalOffice);

adminRouters.get('/api/v1/parties/:partyid', accessibility, adminJob.getPartyById);

adminRouters.get('/api/v1/offices/:officeid', accessibility, adminJob.getOfficeById);

adminRouters.get('/api/v1/parties', accessibility, adminJob.getPoliticalParties);

adminRouters.get('/api/v1/offices', accessibility, adminJob.getPoliticalOffices);

adminRouters.post('/api/v1/candidates', accessibility, adminJob.createACandidate);

adminRouters.delete('/api/v1/parties/:partyid', accessibility, adminJob.deletePoliticalParty);

adminRouters.delete('/api/v1/offices/:officeid', accessibility, adminJob.deletePoliticalOffice);

export default adminRouters;
