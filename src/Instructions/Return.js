class Return extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} */ 
    constructor(linea,column,expression,isReturnExpresion){
        super(linea,column);

        this.expression = expression;
        this.returnExpresion = isReturnExpresion;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += "return ";

        if(this.expression != null){
            this.translatedCode += `(${this.expression.getTranslated()})`
        }

        return `${this.translatedCode};\n`;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var result;
        
        if(e.enviromentType.enumEnvironmentType == EnvironmentType.GLOBAL){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`no se puede utilizar return en este entorno`,e.enviromentType));
            return null;
        }else{
            if(this.returnExpresion){
                result = this.expression.getValue(e);
                return new Return(this.line,this.column,result,true);
            }
        }
        return null;
    }

}