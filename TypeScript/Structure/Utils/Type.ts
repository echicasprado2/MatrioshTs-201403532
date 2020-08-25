/**
 *  @enum of type use in language.
 */

export enum EnumType{
    NUMBER = 'NUMBER',
    BOOLEAN = 'BOOLEAN',
    STRING = 'STRING',
    VOID = 'VOID',
    TYPE = "TYPE",
    ARRAY = 'ARRAY',
    NULL = 'NULL',
    ERROR = 'ERROR'
}

/**
 * @class type use for type anyone expresion with value
 */

export class Type {
    enumType: EnumType;

    constructor(enumType: EnumType){
        this.enumType = enumType;
    }

    toString(){
        return this.enumType.toString();
    }
}