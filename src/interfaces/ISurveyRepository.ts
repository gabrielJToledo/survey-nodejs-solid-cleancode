export interface ISurveyRepository {
    save(surveyData: any): Promise<any>;
    findOpenSurvey(profileId: string, userId: string): Promise<any>;
    updateSurvey(surveyId: string, surveyData: any): Promise<any>;
}
