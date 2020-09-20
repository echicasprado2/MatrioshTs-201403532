class TypeAttributeDefinition extends Instruction {
    
    constructor(linea,column,identify,type){
        super(linea,column);

        this.identify = identify;
        this.type = type;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identify} `

        if(this.type.enumType != EnumType.NULL){
            this.translatedCode += `: ${this.type.toString()}`;
        }

        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              this.identify,
              this.type,
              e.enviromentType.name,
              null
            )
        );
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        //TODO implemented this
        throw new Error("Method not implemented.");
    }

}