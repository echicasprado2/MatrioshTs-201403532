export var EnumEnvironmentType;
(function (EnumEnvironmentType) {
    EnumEnvironmentType["GLOBAL"] = "GLOBAL";
    EnumEnvironmentType["IF"] = "IF";
    EnumEnvironmentType["FOR"] = "FOR";
    EnumEnvironmentType["WHILE"] = "WHILE";
    EnumEnvironmentType["DO"] = "DO";
    EnumEnvironmentType["FUNCTION"] = "FUNCION";
})(EnumEnvironmentType || (EnumEnvironmentType = {}));
export class EnvironmentType {
    constructor(enumEnvironmentType) {
        this.enumEnvironmentType = enumEnvironmentType;
    }
}
