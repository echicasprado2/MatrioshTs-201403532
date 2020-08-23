import { EnvironmentType } from './../Utils/EnvironmentType';
import { Simbol } from './Simbol';
import { EINPROGRESS } from 'constants';


export class Environment{
    previous: Environment;
    table: Map<String,Simbol>;
    enviromentType: EnvironmentType;

    constructor(previous: Environment, environmentType: EnvironmentType){
        this.previous = previous;
        this.enviromentType = environmentType;
        this.table = new Map<String, Simbol>();
    }

}