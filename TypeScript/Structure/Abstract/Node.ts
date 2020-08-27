export abstract class Node {
  public line: Number;
  public column: Number;
  public nodeName: string;
  public graphcsCode: string;

  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
    this.nodeName = "";
    this.graphcsCode = "";
  }
}
