import { Type } from "../Structure/Utils/Type";
import { Expresion } from "../Structure/Abstract/Expresion";
import { Environment } from "../Structure/Simbols/Environment";


/**
 * @class use this class for save all value
 */
export class Value extends Expresion{

    esArray: Boolean;
    type: Type;
    value: any;
    valueArray: object[];

    /**
     * 
     * @param type - Type
     * @param value - Object
     * 
     */

    constructor(type: Type, value: any){
        super();
        if(value instanceof Array){
            this.esArray = true;
            this.valueArray = value;
            this.type = type;
            this.value = null;
        }else{
            this.esArray = false;
            this.valueArray = [];
            this.type = type;
            this.value = value;
        }
    }

    getValue(e: Environment): Expresion {
        if(this.esArray){
            return new Value(this.type,this.valueArray);
        }else{
            return new Value(this.type,this.value);
        }
    }

}