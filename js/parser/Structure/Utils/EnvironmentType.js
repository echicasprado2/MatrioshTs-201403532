"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentType = exports.EnumEnvironmentType = void 0;
var EnumEnvironmentType;
(function (EnumEnvironmentType) {
    EnumEnvironmentType["GLOBAL"] = "GLOBAL";
    EnumEnvironmentType["IF"] = "IF";
    EnumEnvironmentType["FOR"] = "FOR";
    EnumEnvironmentType["WHILE"] = "WHILE";
    EnumEnvironmentType["DO"] = "DO";
    EnumEnvironmentType["FUNCTION"] = "FUNCION";
})(EnumEnvironmentType = exports.EnumEnvironmentType || (exports.EnumEnvironmentType = {}));
var EnvironmentType = /** @class */ (function () {
    function EnvironmentType(enumEnvironmentType) {
        this.enumEnvironmentType = enumEnvironmentType;
    }
    return EnvironmentType;
}());
exports.EnvironmentType = EnvironmentType;
