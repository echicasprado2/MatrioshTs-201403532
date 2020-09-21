class Break extends Instruction {

    constructor(linea,column){
        super(linea,column);
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += "break;\n";
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        //TODO test

        for(var env = e; env != null; env = env.previous){
            if(env.enviromentType.enumEnviromentType == EnvironmentType.FOR
                || env.enviromentType.enumEnviromentType == EnvironmentType.FOR_IN
                || env.enviromentType.enumEnviromentType == EnvironmentType.FOR_OF
                || env.enviromentType.enumEnviromentType == EnvironmentType.SWICH
                || env.enviromentType.enumEnviromentType == EnvironmentType.WHILE
                || env.enviromentType.enumEnviromentType == EnvironmentType.DO
                || env.enviromentType.enumEnviromentType == EnvironmentType.IF){
                    return this;
                }
        }
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Continue debe de estar dentro de una sentencia de control`,e.enviromentType));
        return null;
    }

}