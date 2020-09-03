/**
 *  @enum of type use in language.
 */
var EnumVariableType;
(function (EnumVariableType) {
    EnumVariableType["LET"] = "LET";
    EnumVariableType["CONST"] = "CONST";
})(EnumVariableType || (EnumVariableType = {}));
/**
 * @class type use for type anyone expresion with value
 */
class Type {
    /**
     * 
     * @param {*} enumType 
     */
    constructor(enumType) {
        this.enumType = enumType;
    }
    
    /**
     * @return type of value 
     */
    toString() {
        return this.enumType.toString().toLowerCase();
    }
}
