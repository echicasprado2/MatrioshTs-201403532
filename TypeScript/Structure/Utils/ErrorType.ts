/**
 * @enum use for error type with 
 *  lexico, sintactico and semantico
 */

export enum EnumErrorType{
    LEXICO = 'LEXICO',
    SYNTACTIC = 'SINTACTICO',
    SEMANTIC = 'SEMANTICO'
}

/**
 * @class use class for all error 
 */
export class ErrorType{
    enumErrorType: EnumErrorType;

    constructor(enumErrorType: EnumErrorType){
        this.enumErrorType = enumErrorType;
    }

    toString(){
        return this.enumErrorType.toString();
    }
}