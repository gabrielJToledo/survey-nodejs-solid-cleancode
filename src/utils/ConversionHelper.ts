export class ConversionHelper {
    static objectToObject(source: any, target: any): void {
        Object.keys(source).forEach(key => {
            if (source[key] !== undefined && source[key] !== null) {
                target[key] = source[key];
            }
        });
    }
}
