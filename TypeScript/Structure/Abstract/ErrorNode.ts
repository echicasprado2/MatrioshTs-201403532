import { ErrorType } from "../Utils/ErrorType";
import { EnvironmentType } from "../Utils/EnvironmentType";

export class ErrorNode{
    line: number;
    column: number;
    errorType: ErrorType;
    description: string;
    environmentType: EnvironmentType;

    constructor(line:number,column:number,errorType:ErrorType,description:string, environmentType:EnvironmentType){
        this.line = line;
        this.column = column;
        this.errorType = errorType;
        this.description = description;
        this.environmentType = environmentType; 
    }
}