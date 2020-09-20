class GraphTs extends Instruction {
    constructor(linea,column){
        super(linea,column);
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = "graficar_ts()";
        return this.translatedCode+ "\n";
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "GRAPTH_TS",
              null,
              e.enviromentType,
              null
            )
        );
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        //TODO implemented this
        throw new Error("Method not implemented.");
    }

}