class While extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} expression 
     * @param {*} block 
     */
    constructor(linea,column,expression,block){
        super(linea,column);

        this.expression = expression;
        this.block = block;

        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        console.log(this.expression);
        console.log(this.block);
        this.translatedCode += `while(${this.expression.getTranslated()})`
        this.translatedCode += this.block.getTranslated();
        return `${this.translatedCode}\n\n`;
    }

    getGraphsCode(){
        return this.graphcsCode;
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