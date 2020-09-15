var EnumEnvironmentType;
(function (EnumEnvironmentType) {
    EnumEnvironmentType["GLOBAL"] = "GLOBAL";
    EnumEnvironmentType["IF"] = "IF";
    EnumEnvironmentType["FOR"] = "FOR";
    EnumEnvironmentType["WHILE"] = "WHILE";
    EnumEnvironmentType["DO"] = "DO";
    EnumEnvironmentType["FUNCTION"] = "FUNCION";
    EnumEnvironmentType["TYPE"] = "TYPE";
})(EnumEnvironmentType || (EnumEnvironmentType = {}));
class EnvironmentType {
    /**
     * 
     * @param {*} enumEnvironmentType 
     */
    constructor(enumEnvironmentType,name) {
        this.enumEnvironmentType = enumEnvironmentType;
        this.name = name;
    }

    toString() {
        return this.enumEnvironmentType.toString();
    }

}
