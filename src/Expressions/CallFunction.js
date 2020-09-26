class CallFunction extends Expresion {

    constructor(linea,column,identifier,parametros,isFinal){
        super(linea,column,null,null);
        this.identifier = identifier;
        this.parametros = parametros;
        this.isFinal = isFinal;//solo para poner punto y coma en traduccion
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identifier}(`

        for(var i = 0;i < this.parametros.length;i++){
            this.translatedCode += (i == 0) ? this.parametros[i].getTranslated() : `, ${this.parametros[i].getTranslated()}`; 
        }
        this.translatedCode += ")";

        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            if(this.isFinal){
                return `${this.translatedCode};\n`
            }
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
        var result = new Value(new Type(EnumType.ERROR,""),"Error");
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.FUNCTION,null));
        var symbolFunction;
        var resultParametroDeclaration;
        var resultValueParametroDeclaration;

        symbolFunction = e.searchSymbol(this.identifier);

        if(symbolFunction == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la funcion: "${this.identifier}" no esta definida`,e.enviromentType));
            return result;
        }

        if(this.parametros.length != symbolFunction.value.parameters.length){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el numero de paramtros no coindide con los parametros de la funcion "${this.identifier}"`,e.enviromentType));
            return result;
        }

        for(var i = 0; i < this.parametros.length; i++){
            resultParametroDeclaration = symbolFunction.value.parameters[i];
            resultValueParametroDeclaration = this.parametros[i].getValue(e);

            console.log(symbolFunction);
            console.log(resultParametroDeclaration);
            console.log(resultValueParametroDeclaration);

            if(resultValueParametroDeclaration == null || resultValueParametroDeclaration.type.enumType == EnumType.ERROR){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`error con el valor del parametro: "${resultParametroDeclaration.identifier}"`,e.enviromentType));
                return result;
            }

            if(resultParametroDeclaration.type.enumType != resultValueParametroDeclaration.type.enumType){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo del parametro y el tipo de valor no coinciden function: ${this.identifier}`,e.enviromentType));
                return result;
            }

            env.insertParameter(resultParametroDeclaration.identifier,new Symbol(this.line,this.column,resultParametroDeclaration.identifier,resultParametroDeclaration.type,new DeclarationType(EnumDeclarationType.LET),resultValueParametroDeclaration));
        }
        
        result = symbolFunction.value.instructions.execute(env);

        if(result == null && symbolFunction.value.type.enumType != EnumType.VOID){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la funcion debe de retornar un valor del tipo: "${symbolFunction.value.type.toString()}"`,env.enviromentType));
            return new Value(new Type(EnumType.ERROR,null),"Error");
        }
        
        if(result == null && symbolFunction.value.type.enumType == EnumType.VOID){
            return  new Value(new Type(EnumType.VOID,null),"");
        }
        
        if(result != null){
            
            if(result instanceof Return){

                if(result.expression.type.enumType != symbolFunction.value.type.enumType){
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el tipo de valor de retorno no es el mismo del tipo de la funcion : "${symbolFunction.value.type.toString()} != ${result.expression.type.toString()}"`,env.enviromentType));
                    return new Value(new Type(EnumType.ERROR,null),"Error");
                }

                return result.expression.getValue(env);
            }else{
                console.log("error con lo que esta llegando de valor para retornar en llamada de funcion");
            }

        }
        return result;
    }

}