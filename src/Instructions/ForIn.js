class ForIn extends Instruction {

    constructor(linea,column,declaration,expression,block){
        super(linea,column);

        this.declaration = declaration;
        this.expression = expression;
        this.block = block;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `for(${this.declaration.getTranslated().replace("\n","").replace(";","")} in ${this.expression.getTranslated()})`;
        this.translatedCode += `${this.block.getTranslated()}\n\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "FOR IN",
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
        var resultExpresion;
        var idVariable;
        var valueSymbol;
        var lengthArray;
        var resultBlock;
        var valueIn;
        var env;
        var envFor = new Environment(e,new EnvironmentType(EnumEnvironmentType.FOR_IN,null));

        if(this.declaration instanceof Declaration){
            if(this.declaration.ids.length > 1){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se se puede declarar mas de una variable`,envFor.enviromentType));
                return null;
            }
            this.declaration.execute(envFor);
            idVariable = this.declaration.ids[0];
        }
        
        if(!(this.expression instanceof Access)){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Solo se permiten variables`,envFor.enviromentType));
            return null;
        }
        
        resultExpresion = this.expression.getValue(e);

        if(!(resultExpresion instanceof Expresion)){
            return null;
        }
        
        if(resultExpresion == null || resultExpresion.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se encontro la variable`,envFor.enviromentType));
            return null;
        }
        
        if(resultExpresion.enumType != EnumType.ARRRAY){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Este for solo funciona con arreglos`,envFor.enviromentType));
            return null;
        }

        valueSymbol = envFor.searchSymbol(idVariable);
        lengthArray = resultExpresion.value.length;

        valueSymbol.type.enumType = EnumType.NUMBER;
        valueIn = new Value(new TypeError(EnumType.NUMBER,null),0);

        for(let i = 0; i < lengthArray; i++){
            valueIn.value = i;
            valueSymbol.value = valueIn;
            envFor.insert(valueSymbol.id,valueSymbol);
            
            env = new Environment(envFor,new EnvironmentType(EnumEnvironmentType.FOR,null));
            resultBlock = this.block.execute(env);

            if(resultBlock != null){
                if(resultBlock instanceof Break){
                    return null;
                }else if(resultBlock instanceof Continue){
                    /** muere el continue */
                }else if(resultBlock instanceof Return){
                    return resultBlock;
                }else{
                    console.log("Error en for in");
                }
            }

        }

        return null;
    }

}