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
  
    constructor(
      profileId: string = '',
      userId: string = '',
      status: string = '',
      createdOn: Date = new Date(),
      updatedOn: Date = new Date(),
      potentialId: string = ''
    ) {
      this.profileId = profileId;
      this.userId = userId;
      this.status = status;
      this.createdOn = createdOn;
      this.updatedOn = updatedOn;
      this.potentialId = potentialId;
    }
  }
  