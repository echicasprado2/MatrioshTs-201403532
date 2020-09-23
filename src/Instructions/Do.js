class Do extends Instruction {

    constructor(linea,column,block,condition){
        super(linea,column);

        this.condition = condition;
        this.block = block;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `do ${this.block.getTranslated()}while(${this.condition.getTranslated()});\n\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "DO",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.DO,""));
        this.condition.translatedSymbolsTable(env);
        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        //TODO implemented this
        var resultCondition;
        var resultBlock;
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.DO,null));

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
        
        if(resultCondition == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de while tiene errores`,e.enviromentType));
            return null;
        }
        
        if(resultCondition.type.enumType != EnumType.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la condicion de while no es de tipo boolean`,e.enviromentType));
            return null;
        }


        return null;
    }

}