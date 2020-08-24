"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node(line, column, type) {
        this.line = line;
        this.column = column;
        this.type = type;
    }
    return Node;
}());
exports.Node = Node;
