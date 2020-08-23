export enum EnumEnvironmentType{
    GLOBAL   = 'GLOBAL',
    IF       = 'IF',
    FOR      = 'FOR',
    WHILE    = 'WHILE',
    DO       = 'DO',
    FUNCTION = 'FUNCION'
}

export class EnvironmentType{
    enumEnvironmentType: EnumEnvironmentType;

    constructor(enumEnvironmentType: EnumEnvironmentType){
        this.enumEnvironmentType = enumEnvironmentType;
    }
}