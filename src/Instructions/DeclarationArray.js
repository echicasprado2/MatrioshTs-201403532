class DeclarationArray extends Instruction {
    constructor(linea,column,typeDeclaration,ids,type,value){
        super(linea,column);
        this.typeDeclaration = typeDeclaration;
        this.ids = ids;
        this.type = type;
        this.value = value;
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