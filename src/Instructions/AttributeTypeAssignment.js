class AttributeTypeAssignment extends Instruction {
    
    constructor(line,column,identify,value){
        super(line,column);
        
        this.identify = identify;
        this.value = value;
        
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identify}: ${this.value.getTranslated()}`
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
                this.line,
                this.column,
                this.identify,
                null,
                e.name,
                null
            )
        );
    }

    executeSymbolsTable(e){
        return "";
    }

    execute(e) {
        //TODO implemented this
        throw new Error("Method not implemented.");
    }

}