import { Type } from "../Utils/Type";

export class Simbol{
    type: Type;
    id: string;
    value: Object;

    constructor(type:Type,id:string,value:Object){
        this.type = type; 
        this.id = id;
        this.value = value;
    }
}