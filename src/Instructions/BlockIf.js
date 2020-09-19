class BlockIf extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} expresion 
     * @param {*} block 
     * @param {*} isElseIf 
     */
    constructor(linea,column,expresion,block,isElseIf){
        super(linea,column);

        this.expresion = expresion;
        this.block = block;
        this.conditionTrue = false;
        this.isElseIf =isElseIf;

        this.translatedCode = "";
    }

    getTranslated(){

        if(this.isElseIf){
            this.translatedCode += `else if(${this.expresion.getTranslated()})`;
        }else{
            this.translatedCode += `if(${this.expresion.getTranslated()})`;
        }

        this.translatedCode += `${this.block.getTranslated()}`;

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