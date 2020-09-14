class For extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} declaration 
     * @param {*} condition 
     * @param {*} expression 
     * @param {*} block 
     */
    constructor(linea,column,declaration,condition,expression,block){
        super(linea,column);

        this.declaration = declaration; // this declaration is Declaration or Assignment or Id
        this.condition = condition;
        this.expression = expression;
        this.block = block;

        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `for(${this.declaration.getTranslated().replace("\n","").replace(";","")}; ${this.condition.getTranslated()}; ${this.expression.getTranslated()})`;
        this.translatedCode += `${this.block.getTranslated()}\n\n`;
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