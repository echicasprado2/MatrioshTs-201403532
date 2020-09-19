class CaseSwitch extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} expression 
     * @param {*} block 
     * @param {*} isCase 
     * @param {*} haveBlock 
     */
    constructor(linea,column,expression,block,isCase,haveBlock){
        super(linea,column);

        this.expression = expression;
        this.block = block;
        this.isCase = isCase;
        this.haveBlock = haveBlock;

        this.translatedCode = "";
    }

    getTranslated(){
        var tmp = "";

        if(this.isCase){
            this.translatedCode += `case ${this.expression.getTranslated()}:\n`
        }else{
            this.translatedCode += "default:\n";
        }

        if(this.haveBlock){
            tmp = this.block.getTranslated();
            tmp = tmp.replace("{","");
            tmp = tmp.replace("}","");
            tmp = tmp.replace("\n","");
        }

        this.translatedCode += tmp;

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