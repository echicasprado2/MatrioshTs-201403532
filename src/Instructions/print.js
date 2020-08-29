class Print extends Instruction {
    constructor(linea, column, expresion) {
        super(linea, column);
        this.value = expresion;
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph.generateOneChield(this,'PRINT',this.value);
        this.translatedCode = "console.log("+ this.value.translatedCode +");\n";
    }
    
    execute(e) {
        throw new Error("Method not implemented.");
    }
}
