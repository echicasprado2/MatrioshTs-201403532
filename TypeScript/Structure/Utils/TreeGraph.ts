import { Expresion } from "../Abstract/Expresion";
import { Static } from "./Static";

export class TreeGraph {
  numberNode: number;

  constructor() {
    this.numberNode = 0;
  }

  public getNumberNode(): string {
    this.numberNode++;
    return String("node" + this.numberNode);
  }

  public generateLeafNodeExpresion(e: Expresion): string {
    return e.nodeName + "((" + e.value.toString() + "))";
  }

  public generateNode(e: Node, tag: string): string {
    return e.nodeName + "((" + tag + "))";
  }

  public generateOneChield(father: Node, tag: string, chield: Node): string {
    var tmp: string = chield.nodeName;
    tmp += Static.treeGraph.generateNode(father, tag);
    tmp += father.nodeName;
    tmp += " --> ";
    tmp += chield.nodeName;
    return tmp;
  }
}
