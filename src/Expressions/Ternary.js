class Ternary extends Expresion {
    constructor(linea,column,condition,conditionTrue,conditionFalse){
        super(linea,column,null,null);
        this.condition = condition;
        this.conditionTrue = conditionTrue;
        this.conditionFalse = conditionFalse;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.condition.getTranslated()} ? ${this.conditionTrue.getTranslated()} : ${this.conditionFalse.getTranslated()}`
        
        if (this.parentesis) {
            return `(${this.translatedCode})`;
        } else {
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
        var result = new Value(new TypeError(EnumType.ERRRO,""),"Error");
        var resultCondition;
        var resultTrue;
        var resultFalse;

        resultCondition = this.condition.getValue(e);

        if(resultCondition.type.enumType != EnumType.BOOLEAN || resultCondition.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de condicion es incorrecta`,e.enviromentType));
            return result;
        }
        
        if(resultCondition.value){
            resultTrue = this.conditionTrue.getValue(e);
            return resultTrue;
        }else{
            resultFalse = this.conditionFalse.getValue(e);
            return resultFalse;
        }

}