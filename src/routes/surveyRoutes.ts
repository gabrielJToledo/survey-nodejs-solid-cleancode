import { Router } from 'express';
import { SurveyController } from '../controllers/SurveyController';
import { SurveyService } from '../services/SurveyService';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { ZohoService } from '../services/ZohoService';

const surveyRepository = new SurveyRepository();
const zohoService = new ZohoService();
const surveyService = new SurveyService(surveyRepository, zohoService);
const surveyController = new SurveyController(surveyService);

const router = Router();

router.post('/survey', (req, res) => surveyController.createSurvey(req, res));
router.get('/survey/:profileId/:userId', (req, res) => surveyController.getSurveyStatus(req, res));

export default router;
