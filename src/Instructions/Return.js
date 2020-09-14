class Return extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} */ 
    constructor(linea,column,expression){
        super(linea,column);

        this.expression = expression;

        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += "return ";

        if(this.expression != ""){
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