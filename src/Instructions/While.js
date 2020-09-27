class While extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} condition 
     * @param {*} block 
     */
    constructor(linea,column,condition,block){
        super(linea,column);

        this.condition = condition;
        this.block = block;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `while(${this.condition.getTranslated()})`
        this.translatedCode += this.block.getTranslated();
        return `${this.translatedCode}\n\n`;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "WHILE",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.WHILE,""));
        this.condition.translatedSymbolsTable(env);
        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var resultCondition;
        var resultBlock;
        var env;

        resultCondition = this.condition.getValue(e);
        
        if(resultCondition == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de while tiene errores`,e.enviromentType));
            return null;
        }
        
        if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de while no es de tipo boolean`,e.enviromentType));
            return null;
        }

        while(resultCondition.value){

            env = new Environment(e,new EnvironmentType(EnumEnvironmentType.WHILE,null));
            resultBlock = this.block.execute(env);

            if(resultBlock != null){
                if(resultBlock instanceof Break){
                    return null;
                }else if(resultBlock instanceof Continue){
                    // muere el continue
                }else if(resultBlock instanceof Return){
                    return resultBlock;
                }
            }
            
            resultCondition = this.condition.getValue(e);

            if(resultCondition.type.enumType == EnumType.ERROR){
                return null;
            }
        }
        
        return null;
    }

}