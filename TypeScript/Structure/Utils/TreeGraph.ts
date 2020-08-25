import { StringBuilder } from "typescript-string-operations";
import { tmpdir } from "os";
import { Expresion } from "../Abstract/Expresion";
import { Static } from "./Static";

export class TreeGraph {
  numberNode: number;

  constructor() {
    this.numberNode = 0;
  }

  public getNumberNode(): string {
    this.numberNode++;
    return String("node"+this.numberNode);
  }

  public generateLeafNodeExpresion(e: Expresion):StringBuilder{
    var tmp: StringBuilder = new StringBuilder();
    tmp.Append(e.nodeName);
    tmp.Append("((");
    tmp.Append(e.value.toString());
    tmp.Append("))");
    return tmp;
  }

  public generateNode(e: Node,tag :string):StringBuilder{
    var tmp: StringBuilder = new StringBuilder();
    tmp.Append(e.nodeName);
    tmp.Append("((");
    tmp.Append(tag);
    tmp.Append("))");
    return tmp;
  }

  public generateOneChield(father: Node, tag: string, chield: Node):StringBuilder{
    var tmp: StringBuilder = new StringBuilder();
    tmp.Append(chield.nodeName);
    tmp.Append(Static.treeGraph.generateNode(father,tag).ToString());
    tmp.Append(father.nodeName);
    tmp.Append("-->");
    tmp.Append(chield.nodeName);
    return tmp;
  }

}
