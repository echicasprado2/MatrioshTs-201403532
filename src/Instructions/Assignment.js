class Assignment extends Instruction {
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} access 
     * @param {*} expresion 
     */
    constructor(linea,column,access,expresion){
        super(access[0].line,access[0].column);
        this.access = access;
        this.value = expresion;
        this.translatedCode = "";
    }

    getTranslated(){
        for(var i = 0;i < this.access.length;i++){
            this.translatedCode += (i == 0) ? this.access[i].getTranslated() : "." + this.access[i].getTranslated(); 
        }
        
        this.translatedCode += " = ";
        
        if(this.value instanceof Array){
            this.translatedCode += "[";
            for(var i = 0;i < this.value.length;i++){
                if(i == 0){
                    this.translatedCode += this.value[i].getTranslated();
                }else{
                    this.translatedCode += "," + this.value[i].getTranslated();
                }
            }
            this.translatedCode += "]";
        }else{
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
        //TODO implementar para array y types
        var resultSymbol = this.access[0].getValue(e);
        var resultExp = this.value.getValue(e);

        if(resultSymbol == null || resultSymbol.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable no esta definida`,e.enviromentType));
            return null;
        }

        if(resultExp.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor no se puede asignar`,e.enviromentType));
            return null;
        }

        if(resultSymbol.typeDeclaration.enumType == EnumDeclarationType.CONST){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable de tipo CONST, no se puede cambiar el valor`,e.enviromentType));
            return null;
        }

        if(resultSymbol.type.enumType != resultExp.type.enumType){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el tipo de valor no coincide con el tipo de variable ${resultSymbol.type.toString()} != ${resultExp.type.toString()}`,e.enviromentType));
            return null;
        }

        e.insert(resultSymbol.id,new Symbol(resultSymbol.line,resultSymbol.column,resultSymbol.id,resultSymbol.type,resultSymbol.typeDeclaration,resultExp));
        return null;

    }

    executeArray(e){//TODO hacer asignacion de array
    }

    executeType(e){//TODO hacer asignacion de type
    }

}