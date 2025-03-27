import { IZohoService } from '../interfaces/IZohoService';

export class ZohoService implements IZohoService {
  async startSurveyDeal(surveyObject: any): Promise<any> {
    console.log('Starting Deal at Zoho for research', surveyObject);
    return { success: true };
  }

  async insertOnZoho(survey: any): Promise<any> {
    console.log('Inserting research data in Zoho', survey);
    return { success: true };
  }
}
