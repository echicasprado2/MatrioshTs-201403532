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
        TableReport.addTranslated(
            new nodeTableSymbols(
              this.linea,
              this.column,
              "WHILE",
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.WHILE,""));
        this.expression.translatedSymbolsTable(env);
        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}