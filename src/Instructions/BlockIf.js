class BlockIf extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} expresion 
     * @param {*} block 
     * @param {*} isElseIf 
     */
    constructor(linea,column,expresion,block,isElseIf){
        super(linea,column);

        this.expresion = expresion;
        this.block = block;
        this.conditionTrue = false;
        this.isElseIf =isElseIf;

        this.translatedCode = "";
    }

    getTranslated(){

        if(this.isElseIf){
            this.translatedCode += `else if(${this.expresion.getTranslated()})`;
        }else{
            this.translatedCode += `if(${this.expresion.getTranslated()})`;
        }

        this.translatedCode += `${this.block.getTranslated()}`;

        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var resultCondicion;
        var envIf;
        var resultBlock;

        this.conditionTrue = false;
        resultCondicion = this.expresion.getValue(e);

        if(resultCondicion.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La condicion no es de valor boolean`,e.enviromentType));
            return null;
        }

        if(!(resultCondicion.value)){
            return null;
        }

        envIf = new Environment(e,new EnvironmentType(EnumEnvironmentType.IF,null));
        resultBlock = this.block.execute(envIf);
        this.conditionTrue = true;

        if(resultBlock != null){
            if(resultBlock instanceof Break){
                return resultBlock;
            }else if(resultBlock instanceof Continue){
                return resultBlock;
            }else if(resultBlock instanceof Return){
                return resultBlock;
            }else{
                console.log("error dentro del block if");
            }
        }

        return null;
    }

}