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
                e.toString(),
                null
            )
        );
    }

    executeSymbolsTable(e){
        return "";
    }

    execute(e) {

        var exists = e.searchSymbol(this.identify);

        if(exists != null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El nombre del atributo: "${this.identify}" ya se encuentra en uso`,e.enviromentType));
            return null;
        }

        this.value = this.value.getValue(e);
        // TableReport.addExecute(new NodeTableSymbols(this.line,this.column,this.identify,this.value.type,e.toString(),this.value.value));
        return this;
    }

}