/**
 *  @enum of type use in language.
 */
var EnumDeclarationType;
(function (EnumDeclarationType) {
    EnumDeclarationType["LET"] = "LET";
    EnumDeclarationType["CONST"] = "CONST";
})(EnumDeclarationType || (EnumDeclarationType = {}));
/**
 * @class type use for type anyone expresion with value
 */
class DeclarationType {
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
