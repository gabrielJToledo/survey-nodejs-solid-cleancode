import { Request, Response } from 'express';
import { SurveyService } from '../services/SurveyService';

export class SurveyController {
    private surveyService: SurveyService;

    constructor(surveyService: SurveyService) {
        this.surveyService = surveyService;
    }

    public async createSurvey(req: Request, res: Response) {
        try {
            const surveyData = req.body;
            const survey = await this.surveyService.saveSurvey(surveyData);
            res.status(200).json(survey);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getSurveyStatus(req: Request, res: Response) {
        try {
            const { profileId, userId } = req.params;
            const survey = await this.surveyService.checkSurveyOpen(profileId, userId);
            res.status(200).json(survey);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
