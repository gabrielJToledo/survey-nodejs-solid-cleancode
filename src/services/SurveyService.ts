import { SurveyRepository } from '../repositories/SurveyRepository';
import { BusinessException } from '../utils/BusinessException';
import { SurveyObject } from '../models/SurveyObject';
import { IZohoService } from '../interfaces/IZohoService';

export class SurveyService {
  private surveyRepository: SurveyRepository;
  private zohoService: IZohoService;

  constructor(surveyRepository: SurveyRepository, zohoService: IZohoService) {
    this.surveyRepository = surveyRepository;
    this.zohoService = zohoService;
  }

  public async saveSurvey(surveyData: any) {
    try {
      const surveyObject = new SurveyObject();
      surveyObject.createdOn = new Date();
      surveyObject.profileId = surveyData.profileId;
      surveyObject.userId = surveyData.userId;
      surveyObject.status = 'OPEN';

      const savedSurvey = await this.surveyRepository.save(surveyObject);
      return savedSurvey;
    } catch (error) {
      throw new BusinessException('Error saving survey');
    }
  }

  public async checkSurveyOpen(profileId: string, userId: string) {
    return await this.surveyRepository.findOpenSurvey(profileId, userId);
  }
}
