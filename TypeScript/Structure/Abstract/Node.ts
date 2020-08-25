import { StringBuilder } from "typescript-string-operations";

export abstract class Node {
  public line: Number;
  public column: Number;
  public nodeName: string;
  public graphcsCode: StringBuilder;

  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
    this.nodeName = "";
    this.graphcsCode = new StringBuilder();
  }
}
