/**
 *  @enum of type use in language.
 */
var EnumTypeArrayMethod;
(function (EnumTypeArrayMethod) {
    EnumTypeArrayMethod["PUSH"] = "PUSH";
    EnumTypeArrayMethod["POP"] = "POP";
    EnumTypeArrayMethod["LENGTH"] = "LENGTH";
})(EnumTypeArrayMethod || (EnumTypeArrayMethod = {}));
/**
 * @class type use for type anyone expresion with value
 */
class TypeArrayMethod {
    /**
     * 
     * @param {*} enumType 
     */
    constructor(enumType) {
        this.enumType = enumType;
    }
    
    toString() {
        return this.enumType.toString().toLowerCase();
    }
}
