/**
 *  @enum of type use in language.
 */
var EnumType;
(function (EnumType) {
    EnumType["NUMBER"] = "NUMBER";
    EnumType["BOOLEAN"] = "BOOLEAN";
    EnumType["STRING"] = "STRING";
    EnumType["VOID"] = "VOID";
    EnumType["TYPE"] = "TYPE";
    EnumType["ARRAY"] = "ARRAY";
    EnumType["NULL"] = "NULL";
    EnumType["ERROR"] = "ERROR";
})(EnumType || (EnumType = {}));
/**
 * @class type use for type anyone expresion with value
 */
class Type {
    constructor(enumType) {
        this.enumType = enumType;
    }
    toString() {
        return this.enumType.toString();
    }
}
