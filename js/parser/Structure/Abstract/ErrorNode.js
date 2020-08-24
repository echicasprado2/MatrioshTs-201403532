"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNode = void 0;
var ErrorNode = /** @class */ (function () {
    function ErrorNode(line, column, errorType, description, environmentType) {
        this.line = line;
        this.column = column;
        this.errorType = errorType;
        this.description = description;
        this.environmentType = environmentType;
    }
    return ErrorNode;
}());
exports.ErrorNode = ErrorNode;
