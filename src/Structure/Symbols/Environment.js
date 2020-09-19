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

    insert(name,symbol){
        for(var e = this; e != null; e = e.previous){
            if(!e.table.has(name)){// busca si el simbolo existe en el ambito
                if(symbol.type.enumType.ERROR != EnumType.ERROR){// valida si el tipo no es error
                    e.table.set(name,symbol);
                    return;
                }
            }else{
                return;
            }
        }
    }

    searchSymbol(name){
        for(var e = this; e != null; e = e.anterior){
            if(e.table.has(name)){// busca si el simbolo existe en el ambito
                var returnSymbol = e.table.get(name);
                return new Symbol(returnSymbol.id,returnSymbol.type,returnSymbol.value);
            }
        }
        return null;
    }

}
