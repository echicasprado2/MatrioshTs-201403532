class Switch extends Instruction {

    constructor(linea,column,expression,block){
        super(linea,column);

        this.expression = expression;
        this.block = block;

        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `switch (${this.expression.getTranslated()}){\n`;

        for(var i = 0; i < this.block.length; i++){
            this.translatedCode += this.block[i].getTranslated();
        }

        this.translatedCode += "}\n\n";
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