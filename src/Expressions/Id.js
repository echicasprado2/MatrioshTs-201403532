class Id extends Expresion {
    constructor(linea,column,identifier){
        super(linea,column,null,identifier);
        this.translatedCode = identifier;
    }

    getTranslated(){
        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            return this.translatedCode;
        }
    }

    translatedSymbolsTable(e){
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    getValue(e) {
        //TODO implemented this
        throw new Error("Method not implemented.");
    }

}