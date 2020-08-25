"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var typescript_string_operations_1 = require("typescript-string-operations");
var Node = /** @class */ (function () {
    function Node(line, column) {
        this.line = line;
        this.column = column;
        this.nodeName = "";
        this.graphcsCode = new typescript_string_operations_1.StringBuilder();
    }
    return Node;
}());
exports.Node = Node;
