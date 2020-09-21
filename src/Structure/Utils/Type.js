/**
 *  @enum of type use in language.
 */
var EnumType;
(function (EnumType) {
    EnumType["STRING"] = "STRING";
    EnumType["NUMBER"] = "NUMBER";
    EnumType["BOOLEAN"] = "BOOLEAN";
    EnumType["VOID"] = "VOID";
    EnumType["TYPE"] = "TYPE";
    EnumType["ARRAY"] = "ARRAY";
    EnumType["NULL"] = "NULL";
    EnumType["ERROR"] = "ERROR";
    EnumType["FUNCTION"] = "FUNCTION";
    EnumType["VARIABLE"] = "VARIABLE";
})(EnumType || (EnumType = {}));
/**
 * @class type use for type anyone expresion with value
 */
class Type {
    constructor(enumType,identifier) {
        this.enumType = enumType;
        this.identifier = identifier;
    }
    
    toString() {
        if(this.enumType === EnumType.TYPE){
            return this.identifier.toString();
        }else{
            return this.enumType.toString().toLowerCase();
        }
    }
}
