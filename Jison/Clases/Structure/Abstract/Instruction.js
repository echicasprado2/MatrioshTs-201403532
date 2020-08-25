"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instuccion = void 0;
var Node_1 = require("../Abstract/Node");
var Instuccion = /** @class */ (function (_super) {
    __extends(Instuccion, _super);
    function Instuccion(linea, column) {
        return _super.call(this, linea, column) || this;
    }
    return Instuccion;
}(Node_1.Node));
exports.Instuccion = Instuccion;
