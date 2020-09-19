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
        throw new Error("Method not implemented.");
    }

}