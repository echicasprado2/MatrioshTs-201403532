import { Type } from './../Utils/Type';

export abstract class Node {

    line: Number;
    column: Number;
    type: Type;

    constructor(line: number, column:number, type: Type){
        this.line = line;
        this.column = column;
        this.type = type;
    }

}
