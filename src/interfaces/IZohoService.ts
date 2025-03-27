export interface IZohoService {
    startSurveyDeal(surveyObject: any): Promise<any>;
    insertOnZoho(survey: any): Promise<any>;
  }
  