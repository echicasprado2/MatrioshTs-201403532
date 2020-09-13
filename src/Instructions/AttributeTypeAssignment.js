class AttributeTypeAssignment extends Instruction {
    
    constructor(linea,column,identify,value){
        super(linea,column);
        
        this.identify = identify;
        this.value = value;
        
        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identify}: ${this.value.getTranslated()}`
        return this.translatedCode;
    }

    getGraphsCode(){
        this.translatedCode = `${this.identify}: ${this.value.getTranslated}`
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