class Do extends Instruction {

    constructor(linea,column,block,expression){
        super(linea,column);

        this.expression = expression;
        this.block = block;

        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `do ${this.block.getTranslated()}while(${this.expression.getTranslated()});\n\n`;
        return this.translatedCode;
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