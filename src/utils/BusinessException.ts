export class BusinessException extends Error {
    public messages: string[] = [];
    public messageCodes: string[] = [];
  
    constructor(message: string) {
      super(message);
      this.name = 'BusinessException';
    }
  }
  