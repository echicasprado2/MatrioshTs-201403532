class TypeAttributeArrayDefinition extends Instruction {
    
    constructor(linea,column,identify,type,dimentions){
        super(linea,column);

        this.identify = identify;
        this.type = type;
        this.dimentions = dimentions;

        this.translatedCode = "";
    }

    getTranslated(){
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              this.identify,
              this.type,
              e.enviromentType,
              null
            )
        );
        this.attributes.translatedSymbolsTable(e);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}