import { ErrorType } from "../Utils/ErrorType";

export class ErrorNode{
    line: number;
    column: number;
    errorType: ErrorType;
    description: string;

    constructor(line:number,column:number,errorType:ErrorType,description:string){
        this.line = line;
        this.column = column;
        this.errorType = errorType;
        this.description = description;
    }
}