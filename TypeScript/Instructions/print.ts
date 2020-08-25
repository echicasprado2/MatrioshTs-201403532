import { Instuccion } from "../Structure/Abstract/Instruction";
import { Environment } from "../Structure/Simbols/Environment";
import { Expresion } from "../Structure/Abstract/Expresion";
import { Static } from "../Structure/Utils/Static";



export class Print extends Instuccion{
    
    value: Expresion;

    constructor(linea:number,column:number,expresion:Expresion){
        super(linea,column);
        this.value = expresion;
        this.nodeName = Static.treeGraph.getNumberNode();
    }

    execute(e: Environment) {
        throw new Error("Method not implemented.");
    }

}