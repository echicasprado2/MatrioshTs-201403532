import { Type } from "../Structure/Utils/Type";
import { Expresion } from "../Structure/Abstract/Expresion";
import { Environment } from "../Structure/Simbols/Environment";
import { Static } from "../Structure/Utils/Static";

/**
 * @class use this class for save all value
 */
export class Value extends Expresion {
  esArray: Boolean;

  /**
   *
   * @param type - Type
   * @param value - Object
   *
   */

  constructor(type: Type, value: any) {
    super(0, 0, type, value);
    if (value instanceof Array) {
      this.esArray = true;
    } else {
      this.esArray = false;
    }
    this.nodeName = Static.treeGraph.getNumberNode();
    this.graphcsCode = Static.treeGraph.generateLeafNodeExpresion(this);
  }

  getValue(e: Environment): Expresion {
    return new Value(this.type, this.value);
  }
}
