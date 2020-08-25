"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeGraph = void 0;
var typescript_string_operations_1 = require("typescript-string-operations");
var Static_1 = require("./Static");
var TreeGraph = /** @class */ (function () {
    function TreeGraph() {
        this.numberNode = 0;
    }
    TreeGraph.prototype.getNumberNode = function () {
        this.numberNode++;
        return String("node" + this.numberNode);
    };
    TreeGraph.prototype.generateLeafNodeExpresion = function (e) {
        var tmp = new typescript_string_operations_1.StringBuilder();
        tmp.Append(e.nodeName);
        tmp.Append("((");
        tmp.Append(e.value.toString());
        tmp.Append("))");
        return tmp;
    };
    TreeGraph.prototype.generateNode = function (e, tag) {
        var tmp = new typescript_string_operations_1.StringBuilder();
        tmp.Append(e.nodeName);
        tmp.Append("((");
        tmp.Append(tag);
        tmp.Append("))");
        return tmp;
    };
    TreeGraph.prototype.generateOneChield = function (father, tag, chield) {
        var tmp = new typescript_string_operations_1.StringBuilder();
        tmp.Append(chield.nodeName);
        tmp.Append(Static_1.Static.treeGraph.generateNode(father, tag).ToString());
        tmp.Append(father.nodeName);
        tmp.Append("-->");
        tmp.Append(chield.nodeName);
        return tmp;
    };
    return TreeGraph;
}());
exports.TreeGraph = TreeGraph;
