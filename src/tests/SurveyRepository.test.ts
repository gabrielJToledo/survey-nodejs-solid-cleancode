import { SurveyRepository } from '../repositories/SurveyRepository';
import { Survey } from '../models/Survey';
jest.mock('../models/Survey');

describe('SurveyRepository', () => {
  let surveyRepository: SurveyRepository;

  beforeEach(() => {
    surveyRepository = new SurveyRepository();
  });

  test('should save a survey successfully', async () => {
    const saveMock = jest.fn().mockResolvedValue({
      profileId: 'profile123',
      userId: 'user123',
      status: 'OPEN',
      createdOn: new Date(),
    });

    (Survey.prototype.save as jest.Mock) = saveMock;

    const surveyData = { profileId: 'profile123', userId: 'user123' };
    const savedSurvey = await surveyRepository.save(surveyData);

    expect(savedSurvey).toHaveProperty('profileId', 'profile123');
    expect(saveMock).toHaveBeenCalledTimes(1);
  });

  test('should find an open survey', async () => {
    const findMock = jest.fn().mockResolvedValue({
      profileId: 'profile123',
      userId: 'user123',
      status: 'OPEN',
      finish: false,
      createdOn: new Date(),
    });

    (Survey.findOne as jest.Mock) = findMock;

    const survey = await surveyRepository.findOpenSurvey('profile123', 'user123');
    expect(survey).toHaveProperty('profileId', 'profile123');
    expect(findMock).toHaveBeenCalledTimes(1);
  });

  test('should return null when no open survey is found', async () => {
    const findMock = jest.fn().mockResolvedValue(null);

    (Survey.findOne as jest.Mock) = findMock;

    const survey = await surveyRepository.findOpenSurvey('profile123', 'user123');
    expect(survey).toBeNull();
    expect(findMock).toHaveBeenCalledTimes(1);
  });

  test('should update a survey successfully', async () => {
    const updateMock = jest.fn().mockResolvedValue({
      surveyId: 'survey123',
      status: 'CLOSED',
      updatedOn: new Date(),
    });

    (Survey.findByIdAndUpdate as jest.Mock) = updateMock;

    const updatedSurvey = await surveyRepository.updateSurvey('survey123', { status: 'CLOSED' });
    expect(updatedSurvey).toHaveProperty('surveyId', 'survey123');
    expect(updatedSurvey).toHaveProperty('status', 'CLOSED');
    expect(updateMock).toHaveBeenCalledTimes(1);
  });
});
