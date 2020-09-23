class Switch extends Instruction {

    constructor(linea,column,condition,cases){
        super(linea,column);

        this.condition = condition;
        this.casesList = cases;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `switch (${this.condition.getTranslated()}){\n`;

        for(var i = 0; i < this.casesList.length; i++){
            this.translatedCode += this.casesList[i].getTranslated();
        }

        this.translatedCode += "}\n\n";
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "SWITCH",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.SWITCH,""));
        this.condition.translatedSymbolsTable(env);
        this.casesList.translatedSymbolsTable(env);
    }

    execute(e) {
        var resultValueCase;
        var resultBlockCase;
        var env;
        var resultCondition = this.condition.getValue(e);
        
        for(var i = 0; i < this.casesList.length;i++){
            
            if((this.casesList[i]).isCase){
                resultValueCase = (this.casesList[i]).expression.getValue(e);
                
                if(resultValueCase.type.enumType != EnumType.ERROR){
                
                    if(resultCondition.type.enumType == resultValueCase.type.enumType && resultCondition.value == resultValueCase.value){
                        
                        env = new Environment(e,new EnvironmentType(EnumEnvironmentType.SWITCH,null));
                        if((this.casesList[i]).haveBlock){
                            resultBlockCase = (this.casesList[i]).execute(env);

                            if(resultBlockCase != null){
                                if(resultBlockCase instanceof Break){
                                    return null;
                                }else if(resultBlockCase instanceof Continue){
                                    return resultBlockCase;
                                }else if(resultBlockCase instanceof Return){
                                    return resultBlockCase;
                                }
                            }
                        
                        }
                    }
                }else{
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumType.SEMANTIC),`el valor del case tiene errores`,e.enviromentType));
                }

            }else if(!(this.casesList[i]).isCase){//es default
                env = new Environment(e,new EnvironmentType(EnumEnvironmentType.SWITCH,null));
                if((this.casesList[i]).haveBlock){
                    resultBlockCase = (this.casesList[i]).execute(env);

                    if(resultBlockCase != null){
                        if(resultBlockCase instanceof Break){
                            return null;
                        }else if(resultBlockCase instanceof Continue){
                            return resultBlockCase;
                        }else if(resultBlockCase instanceof Return){
                            return resultBlockCase;
                        }
                    }
                
                }
            }
            
        }

        return null;
    }

}