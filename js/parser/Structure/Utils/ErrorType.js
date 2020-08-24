"use strict";
/**
 * @enum use for error type with
 *  lexico, sintactico and semantico
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = exports.EnumErrorType = void 0;
var EnumErrorType;
(function (EnumErrorType) {
    EnumErrorType["LEXICO"] = "LEXICO";
    EnumErrorType["SYNTACTIC"] = "SINTACTICO";
    EnumErrorType["SEMANTIC"] = "SEMANTICO";
})(EnumErrorType = exports.EnumErrorType || (exports.EnumErrorType = {}));
/**
 * @class use class for all error
 */
var ErrorType = /** @class */ (function () {
    function ErrorType(enumErrorType) {
        this.enumErrorType = enumErrorType;
    }
    ErrorType.prototype.toString = function () {
        return this.enumErrorType.toString();
    };
    return ErrorType;
}());
exports.ErrorType = ErrorType;
