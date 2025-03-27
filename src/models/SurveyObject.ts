export class SurveyObject {
    profileId: string;
    userId: string;
    status: string;
    createdOn: Date;
    updatedOn: Date;
    questions: any[] = [];
    finish: boolean = false;
    potentialId: string;
    totalQuestions: number = 21;
}
