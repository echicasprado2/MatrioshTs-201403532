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
            new nodeTableSymbols(
                this.line,
                this.column,
                this.identify,
                e.name,
                null
            )
        );
    }

    executeSymbolsTable(e){
        return "";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}