"use strict";
/**
 *  @enum of type use in language.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.EnumType = void 0;
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
})(EnumType = exports.EnumType || (exports.EnumType = {}));
/**
 * @class type use for type anyone expresion with value
 */
var Type = /** @class */ (function () {
    function Type(enumType) {
        this.enumType = enumType;
    }
    Type.prototype.toString = function () {
        return this.enumType.toString();
    };
    return Type;
}());
exports.Type = Type;
