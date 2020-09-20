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
        //TODO implemented this
        throw new Error("Method not implemented.");
    }

}