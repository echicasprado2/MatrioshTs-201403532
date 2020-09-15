class GraphTs extends Instruction {
    constructor(linea,column){
        super(linea,column);
        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = "graficar_ts()";
        return this.translatedCode+ "\n";
    }

    getGraphsCode(){
        return this.graphcsCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new nodeTableSymbols(
              this.linea,
              this.column,
              "graph_ts",
              e.enviromentType,
              null
            )
        );
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}