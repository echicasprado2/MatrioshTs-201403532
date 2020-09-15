class Id extends Expresion {
    constructor(linea,column,identifier){
        super(linea,column,null,identifier);
        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = identifier;
    }

    getTranslated(){
        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            return this.translatedCode;
        }
    }

    getGraphsCode(){
        return this.graphcsCode;
    }

    translatedSymbolsTable(e){
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    getValue(e) {
        throw new Error("Method not implemented.");
    }

}