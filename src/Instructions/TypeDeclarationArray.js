class TypeDeclarationArray extends Instruction {
    constructor(linea,column,identify,type,dimentions){
        super(linea,column);

        this.identify = identify;
        this.type = type;
        this.dimentions = dimentions;

        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph;
        this.translatedCode = "";
    }

    getTranslated(){
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