var EnumEnvironmentType;
(function (EnumEnvironmentType) {
    EnumEnvironmentType["GLOBAL"] = "GLOBAL";
    EnumEnvironmentType["IF"] = "IF";
    EnumEnvironmentType["FOR"] = "FOR";
    EnumEnvironmentType["FOR_IN"] = "FOR_IN";
    EnumEnvironmentType["FOR_OF"] = "FOR_OF";
    EnumEnvironmentType["WHILE"] = "WHILE";
    EnumEnvironmentType["SWITCH"] = "SWITCH";
    EnumEnvironmentType["DO"] = "DO";
    EnumEnvironmentType["FUNCTION"] = "FUNCTION";
    EnumEnvironmentType["TYPE"] = "TYPE";
    EnumEnvironmentType["NULL"] = "NULL";
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
        if(this.enumEnvironmentType === EnvironmentType.TYPE){
            return this.name;
        }else{
            return this.enumEnvironmentType.toString();
        }
    }

}
