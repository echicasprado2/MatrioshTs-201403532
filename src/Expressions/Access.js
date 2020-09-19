class Access extends Expresion {
    constructor(linea,column,identifiers){
        super(linea,column,null,identifiers);
        this.translatedCode = "";
    }

    getTranslated(){
        for (var i = 0; i < this.value.length; i++) {
            this.translatedCode += i == 0 ? this.value[i].getTranslated() : `.${this.value[i].getTranslated()}`;
        }
        
        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
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
        throw new Error("Method not implemented.");
    }

}