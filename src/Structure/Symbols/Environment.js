class Environment {
    /**
     * 
     * @param {*} previous 
     * @param {*} environmentType 
     */
    constructor(previous, environmentType) {
        this.previous = previous;
        this.enviromentType = environmentType;
        this.table = new Map();
    }

    /**
     * 
     * @param {*} name 
     * @param {*} symbol 
     */
    insert(name,symbol){

        //busco un entorno de funcion o type o global, para guardar el valor
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name)){
                if(e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.GLOBAL 
                    || e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.FUNCTION 
                    || e.enviromentType.EnumEnvironmentType == EnumEnvironmentType.TYPE){
                    if(symbol.type.enumType != EnumType.ERROR){
                        e.table.set(name,symbol);
                        if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
                            TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,e.enviromentType,null));
                        }else{
                            TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,e.enviromentType,symbol.value.value));
                        }

                        return;
                    }
                }
            }
        }

        //busco un entorno en donde este definida esta variable
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name)){
                if(symbol.type.enumType != EnumType.ERROR){
                    e.table.set(name,symbol);

                    if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
                        TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,e.enviromentType,null));
                    }else{
                        TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,e.enviromentType,symbol.value.value));
                    }

                    return;
                }
            }
        }

        //si no encuentro la variable en ningun lugar, guardo en el entorno local
        if(symbol.type.enumType != EnumType.ERROR){
            this.table.set(name,symbol);

            if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
                TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,null));
            }else{
                TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,symbol.value.value));
            }

            return null;
        }

        return null;
    }

    insertParameter(name,symbol){
        this.table.set(name,symbol);

        if(symbol.value instanceof TypeDefinition || symbol.value instanceof Function){
            TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,null));
        }else{
            TableReport.addExecute(new NodeTableSymbols(symbol.line,symbol.column,symbol.id,symbol.type,this.enviromentType,symbol.value.value));
        }
        
    }

    searchSymbol(name){
        for(var e = this; e != null; e = e.previous){
            if(e.table.has(name)){// busca si el simbolo existe en el ambito
                var returnSymbol = e.table.get(name);
                return new Symbol(returnSymbol.line,returnSymbol.column,returnSymbol.id,returnSymbol.type,returnSymbol.typeDeclaration,returnSymbol.value,returnSymbol.dimensions);
            }
        }
        return null;
    }

}
