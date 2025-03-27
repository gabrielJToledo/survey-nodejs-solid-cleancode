import { Survey } from '../models/Survey';
import { ISurveyRepository } from '../interfaces/ISurveyRepository';

export class SurveyRepository implements ISurveyRepository {
  async save(surveyData: any): Promise<any> {
    const survey = new Survey(surveyData);
    await survey.save();
    return survey;
  }

  async findOpenSurvey(profileId: string, userId: string): Promise<any> {
    return await Survey.findOne({
      profileId,
      userId,
      finish: false,
      status: 'OPEN'
    }).sort({ createdOn: -1 });
  }

  async updateSurvey(surveyId: string, surveyData: any): Promise<any> {
    return await Survey.findByIdAndUpdate(surveyId, surveyData, { new: true });
  }
}
