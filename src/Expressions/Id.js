class Id extends Expresion {
    constructor(linea,column,identifier){
        super(linea,column,null,null);
        this.identifier = identifier;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = this.identifier;
        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            return this.translatedCode;
        }
    }

    translatedSymbolsTable(e){
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    /**
     * 
     * @param {*} e
     * @returns retorna el simbolo encontrado en la tabla o un value error. 
     */
    getValue(e) {
        var result = new Value(new Type(EnumType.ERROR,""),"Error");
        var resultSymbol = e.searchSymbol(this.identifier);

        if(resultSymbol == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El identificador: "${this.identifier}", no se encontro`,e.enviromentType));
            return result;
        }else{
            return resultSymbol;   
        }
    }

}