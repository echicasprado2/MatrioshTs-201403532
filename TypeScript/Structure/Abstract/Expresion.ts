import { Node } from "../Abstract/Node";
import { Environment } from "../Simbols/Environment";
import { Type } from "../Utils/Type";

export abstract class Expresion extends Node {
  public type: Type;
  public value: any;

  constructor(line: number, column: number, type: Type, value?: any) {
    super(line, column);
    this.type = type;
    this.value = value || null;
  }

  /**
   *
   * @param e - Environment for get value
   */
  abstract getValue(e: Environment): Expresion;
}
