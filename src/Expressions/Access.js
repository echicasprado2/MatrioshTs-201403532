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
        //TODO test para types

        var result = new Value(new Type(EnumType.ERROR,""),"Error");
        var resultSymbolAccess;

        for(var i = 0; i < this.value.length; i++){
            resultSymbolAccess = this.value[i].getValue(e);

            if(resultSymbolAccess  == null || resultSymbolAccess.type.enumType == EnumType.ERROR ){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El acceso: "${this.value[i].identifier}", no se encontro`,e.enviromentType));
                return result;
            }

        }

        if(resultSymbolAccess.type.enumType == EnumType.FUNCTION || resultSymbolAccess.type.enumType == EnumType.TYPE){
            return resultSymbolAccess

        }else if(resultSymbolAccess instanceof Value){
            return resultSymbolAccess;
        }else{
            
            if(resultSymbolAccess.type.enumType == EnumType.NULL){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable: "${resultSymbolAccess.id}", no tiene valor asignado`,e.enviromentType));
            }

            if(resultSymbolAccess.type.enumType == EnumType.ARRAY){
                result = new Value(new Type(resultSymbolAccess.type.enumType,resultSymbolAccess.type.identifier),this.getCopyArray(e,resultSymbolAccess.value.value));

            }else{
                result = new Value(new Type(resultSymbolAccess.type.enumType,resultSymbolAccess.type.identifier),resultSymbolAccess.value.value);
            }

            return result;
        }
    }

    getCopyArray(e,array){

        let newList = []
        let newValue;

        for(var i = 0; i < array.length; i++){
            if(array[i] instanceof Array){
                newValue = this.getCopyArray(e,array[i]);

            }else if (array[i] instanceof Value){
                newValue = array[i].getValue(e);
            }

            newList.push(newValue);
        }

        return newList;
    }

    getSymbol(e){
        var result = new Value(new Type(EnumType.ERROR,""),"Error");
        var resultSymbolAccess;

        for(var i = 0; i < this.value.length; i++){
            resultSymbolAccess = this.value[i].getValue(e);

            if(resultSymbolAccess  == null || resultSymbolAccess.type.enumType == EnumType.ERROR ){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El acceso: "${this.value[i].identifier}", no se encontro`,e.enviromentType));
                return result;
            }

        }

        if(resultSymbolAccess.type.enumType == EnumType.FUNCTION || resultSymbolAccess.type.enumType == EnumType.TYPE){
            return resultSymbolAccess

        }else if(resultSymbolAccess instanceof Value){
            return resultSymbolAccess;

        }else{
            
            if(resultSymbolAccess.type.enumType == EnumType.NULL){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable: "${resultSymbolAccess.id}", no tiene valor asignado`,e.enviromentType));
            }

            if(resultSymbolAccess.type.enumType == EnumType.ARRAY){
                result = new Value(new Type(resultSymbolAccess.type.enumType,resultSymbolAccess.type.identifier),this.getCopyArray(e,resultSymbolAccess.value.value));

            }else{
                result = new Value(new Type(resultSymbolAccess.type.enumType,resultSymbolAccess.type.identifier),resultSymbolAccess.value.value);
            }

            resultSymbolAccess.value = result;
            return resultSymbolAccess;
        }
    }

}