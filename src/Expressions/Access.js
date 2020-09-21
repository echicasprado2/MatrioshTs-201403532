class Access extends Expresion {
    constructor(linea,column,identifiers){
        super(linea,column,null,identifiers);
        this.translatedCode = "";
    }

    getTranslated(){
        for (var i = 0; i < this.value.length; i++) {
            this.translatedCode += i == 0 ? this.value[i].getTranslated() : `.${this.value[i].getTranslated()}`;
        }
        
        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            return this.translatedCode;
        }
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    getValue(e) {
        //TODO implemented this para accesos de array o de type
        var result = new Value(new Type(EnumType.ERROR,""),"Error");
        var resultSymbolAccess;

        for(var i = 0; i < this.value.length; i++){
            resultSymbolAccess = this.value[i].getValue(e);

            if(resultSymbolAccess  == null || resultSymbolAccess.type.enumType == EnumType.ERROR ){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El acceso: "${this.value[i].identifier}", no se encontro`,e.enviromentType));
                return result;
            }

        }

        result = new Value(new Type(resultSymbolAccess.type.enumType,resultSymbolAccess.type.identifiers),resultSymbolAccess.value.value);
        return result;
    }

}