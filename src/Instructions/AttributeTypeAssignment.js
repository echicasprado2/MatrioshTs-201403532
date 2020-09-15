class AttributeTypeAssignment extends Instruction {
    
    constructor(line,column,identify,value){
        super(line,column);
        
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
        TableReport.addTranslated(
            new nodeTableSymbols(
                this.line,
                this.column,
                this.identify,
                e.enviromentType,
                null
            )
        );
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}