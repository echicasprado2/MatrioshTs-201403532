import { Environment } from "../Simbols/Environment";

export abstract class Instuccion extends Node{
    abstract execute(e:Environment):any;
}