class AssignmentArray extends Instruction {
    
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} access 
     * @param {*} expresion 
     */
    constructor(linea,column,access,expresion){
        super(linea,column);
        
        this.listAccess = access;
        this.value = expresion;

        this.translatedCode = "";
    }

    getTranslated(){
        for(var i = 0;i < this.listAccess.length;i++){
            this.translatedCode += (i == 0) ? this.listAccess[i].getTranslated() : "." + this.listAccess[i].getTranslated(); 
        }
        
        this.translatedCode += " = ";

        if(this.value instanceof Value && this.value.type.enumType == EnumType.NULL){
            this.translatedCode += "[]";
        }else {
            this.translatedCode += this.value.getTranslated();
        }

        return this.translatedCode + ";\n";
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var nameSearch = this.listAccess[0].identifier;
        var listAccessValue = this.listAccess[0].value;

        var resultSymbol = e.searchSymbol(nameSearch);
        var resultValue = this.value.getValue(e);

        if(resultSymbol == null || resultSymbol.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable no esta definida`,e.enviromentType));
            return null;
        }

        if(resultSymbol.typeDeclaration.enumType == EnumDeclarationType.CONST){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable de tipo CONST, no se puede cambiar el valor`,e.enviromentType));
            return null;
        }

        if(resultSymbol.dimensions < listAccessValue.length){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El indice supera las dimenciones del array`,e.enviromentType));
            return null;
        }

        if(resultValue.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error con el valor a guardar`,e.enviromentType));
            return null;
        }

        if(resultSymbol.type.identifier == EnumType.NULL){
            resultSymbol.type.identifier = resultValue.type.enumType;

        }else if(resultSymbol.type.identifier != resultValue.type.enumType){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor es diferente de tipo de valor de variable`,e.enviromentType));
            return null;
        }

        var newValueArray = this.changeValue(e,listAccessValue,resultValue,resultSymbol.value);
        if(newValueArray != null){
            resultSymbol.value = newValueArray;
            e.insert(resultSymbol.id,resultSymbol);
        }
        return null;
    }

    changeValue(e,listAccess,newValue,values){

        if(values.value instanceof Array){

            if(listAccess[0].value > (values.value.length - 1)){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El acceso es mayor al tamaño del array`,e.enviromentType));
                return null;
            }
        
        }

        if(values instanceof Array && values[0] instanceof Value){
        
            if(values[Number(listAccess[0].value)].type.enumType != newValue.type.enumType){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de valor es diferente al que guarda el array`,e.enviromentType));
                return null;
            }

            values[Number(listAccess[0].value)] = newValue;

        }else if(values instanceof Value && values.value instanceof Array && listAccess.length == 1){
            values.value[Number(listAccess[0].value)] = newValue;
        }else{
            var indice = listAccess.shift();
            values.value[Number(indice.value)] = this.changeValue(e,listAccess,newValue,values.value[Number(indice.value)]);
        }

        return values;
    }

}