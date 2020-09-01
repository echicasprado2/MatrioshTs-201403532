class Print extends Instruction {
    constructor(linea, column, expresion) {
        super(linea, column);
        this.value = expresion;
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph.generateOneChield(this,'PRINT',this.value);
        this.translatedCode = "console.log("+ this.value.translatedCode +");\n";
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
        return this.translatedCode;
    }

    /**
     * obtengo el codigo para agregar al grafo del ast
     */
    getGraphsCode(){
        return this.graphcsCode;
    }

    /**
     * 
     * @param {Environment actual} e  
     */
    translatedSymbolsTable(e){
        return "implementar este codigo";
    }

    /**
     * 
     * @param {Enviroment} e 
     */
    executeSymbolsTable(e){
        return "implementar este codigo"
    }

    /**
     * 
     * @param {*} e 
     */
    execute(e) {
        throw new Error("Method not implemented.");
    }
    
}
