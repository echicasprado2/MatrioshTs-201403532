class CallFunction extends Expresion {

    constructor(linea,column,identifier,parametros,isFinal){
        super(linea,column,null,null);
        this.identifier = identifier;
        this.value = parametros;
        this.isFinal = isFinal;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identifier}(`

        for(var i = 0;i < this.value.length;i++){
            this.translatedCode += (i == 0) ? this.value[i].getTranslated() : `, ${this.value[i].getTranslated()}`; 
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
        throw new Error("Method not implemented.");
    }

}