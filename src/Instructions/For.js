class For extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} declaration 
     * @param {*} condition 
     * @param {*} expression 
     * @param {*} block 
     */
    constructor(linea,column,declaration,condition,expression,block){
        super(linea,column);

        this.declaration = declaration; // this declaration is Declaration or Assignment or Id
        this.condition = condition;
        this.expression = expression;
        this.block = block;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `for(${this.declaration.getTranslated().replace("\n","").replace(";","")}; ${this.condition.getTranslated()}; ${this.expression.getTranslated()})`;
        this.translatedCode += `${this.block.getTranslated()}\n\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "FOR",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.FOR,""));
        this.declaration.translatedSymbolsTable(env);
        this.expression.translatedSymbolsTable(env);
        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var resultCondition;
        var resultExpresion;
        var resultBlock;
        var envFor = new Environment(e,new EnvironmentType(EnumEnvironmentType.FOR,null));

        if(this.declaration instanceof Declaration){
            if(this.declaration.ids.length > 1){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se se puede declarar mas de una variable`,envFor.enviromentType));
            }
            this.declaration.execute(envFor);
        }else if(this.declaration instanceof Assignment){
            this.declaration.execute(envFor);
        }

        resultCondition = this.condition.getValue(envFor);
        
        while(resultCondition.value){
            resultBlock = this.block.execute(envFor);
            
            if(resultBlock != null){
                if(resultBlock instanceof Break){
                    return null;
                }else if(resultBlock instanceof Continue){
                    
                }else if(resultBlock instanceof Return){
                    return resultBlock;
                }else{
                    console.log("error con el bloque de for");
                }
            }
            
            resultExpresion = this.expression.getValue(envFor);
            resultCondition = this.condition.getValue(envFor);
        }



        return null;
    }

}