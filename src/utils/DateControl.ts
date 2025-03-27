export class DateControl {
    public getMysqlDate(): string {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    public getMongoDate(): Date {
        return new Date();
    }
}
