import { Node } from "../Abstract/Node";
import { Environment } from "../Simbols/Environment";

export abstract class Instuccion extends Node {
  constructor(linea: number, column: number) {
    super(linea, column);
  }

  abstract execute(e: Environment): any;
}
