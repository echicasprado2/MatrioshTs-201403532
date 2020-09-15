class Return extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} */ 
    constructor(linea,column,expression,returnExpresion){
        super(linea,column);

        this.expression = expression;
        this.returnExpresion = returnExpresion;

        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += "return ";

        if(this.returnExpresion){
            this.translatedCode += `(${this.expression.getTranslated()})`
        }

        return `${this.translatedCode};\n`;
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