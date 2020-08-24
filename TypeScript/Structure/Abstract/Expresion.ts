import { Environment } from "../Simbols/Environment";

export abstract class Expresion {
    /**
     * 
     * @param e - Environment for get value
     */
    abstract getValue(e: Environment): Expresion;
}
