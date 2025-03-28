import { SurveyService } from '../services/SurveyService';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { IZohoService } from '../interfaces/IZohoService';
import { BusinessException } from '../utils/BusinessException';
import { SurveyObject } from '../models/SurveyObject';

jest.mock('../repositories/SurveyRepository');
jest.mock('../interfaces/IZohoService');

describe('SurveyService', () => {
  let surveyService: SurveyService;
  let surveyRepository: SurveyRepository;
  let zohoService: IZohoService;

  beforeEach(() => {  
    surveyRepository = new SurveyRepository();
    zohoService = {} as IZohoService; 
    surveyService = new SurveyService(surveyRepository, zohoService);
  });

  test('should save a survey successfully', async () => {
    
    const saveMock = jest.spyOn(surveyRepository, 'save').mockResolvedValue(new SurveyObject());
    const surveyData = { profileId: 'profile123', userId: 'user123' };
    const savedSurvey = await surveyService.saveSurvey(surveyData);

    expect(savedSurvey).toBeInstanceOf(SurveyObject);
    expect(saveMock).toHaveBeenCalledTimes(1);
  });

  test('should throw an error when saving a survey fails', async () => {
    jest.spyOn(surveyRepository, 'save').mockRejectedValue(new Error('Database error'));

    const surveyData = { profileId: 'profile123', userId: 'user123' };

    await expect(surveyService.saveSurvey(surveyData)).rejects.toThrow(BusinessException);
  });

  test('should return an open survey', async () => {
    const surveyMock = new SurveyObject();
    surveyMock.status = 'OPEN';
    jest.spyOn(surveyRepository, 'findOpenSurvey').mockResolvedValue(surveyMock);

    const result = await surveyService.checkSurveyOpen('profile123', 'user123');
    expect(result).toBe(surveyMock);
  });

  test('should return null when there is no open survey', async () => {
    jest.spyOn(surveyRepository, 'findOpenSurvey').mockResolvedValue(null);

    const result = await surveyService.checkSurveyOpen('profile123', 'user123');
    expect(result).toBeNull();
  });
});
