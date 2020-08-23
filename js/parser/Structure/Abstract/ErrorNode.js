"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNode = void 0;
var ErrorNode = /** @class */ (function () {
    function ErrorNode(line, column, errorType, description) {
        this.line = line;
        this.column = column;
        this.errorType = errorType;
        this.description = description;
    }
    return ErrorNode;
}());
exports.ErrorNode = ErrorNode;
