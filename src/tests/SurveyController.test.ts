import request from 'supertest';
import express from 'express';
import { SurveyController } from '../controllers/SurveyController';
import { SurveyService } from '../services/SurveyService';

jest.mock('../services/SurveyService');

describe('SurveyController', () => {
  let app: express.Express;
  let surveyService: SurveyService;
  let surveyController: SurveyController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    surveyService = new SurveyService({} as any, {} as any); 
    surveyController = new SurveyController(surveyService);

    app.post('/survey', surveyController.createSurvey.bind(surveyController));
    app.get('/survey/:profileId/:userId', surveyController.getSurveyStatus.bind(surveyController));
  });

  test('should create a survey successfully', async () => {
    const surveyData = { profileId: 'profile123', userId: 'user123' };
    const mockSavedSurvey = { ...surveyData, status: 'OPEN', createdOn: new Date() };

    (surveyService.saveSurvey as jest.Mock).mockResolvedValue(mockSavedSurvey);

    const response = await request(app).post('/survey').send(surveyData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('profileId', 'profile123');
    expect(response.body).toHaveProperty('status', 'OPEN');
  });

  test('should handle error when creating a survey', async () => {
    const surveyData = { profileId: 'profile123', userId: 'user123' };

    (surveyService.saveSurvey as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).post('/survey').send(surveyData);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Database error');
  });

  test('should get survey status successfully', async () => {
    const mockSurvey = { profileId: 'profile123', userId: 'user123', status: 'OPEN' };

    (surveyService.checkSurveyOpen as jest.Mock).mockResolvedValue(mockSurvey);

    const response = await request(app).get('/survey/profile123/user123');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('profileId', 'profile123');
    expect(response.body).toHaveProperty('status', 'OPEN');
  });

  test('should handle error when getting survey status', async () => {
    (surveyService.checkSurveyOpen as jest.Mock).mockRejectedValue(new Error('Survey not found'));

    const response = await request(app).get('/survey/profile123/user123');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Survey not found');
  });
});
