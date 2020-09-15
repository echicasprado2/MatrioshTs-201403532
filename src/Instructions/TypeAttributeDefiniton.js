class TypeAttributeDefinition extends Instruction {
    
    constructor(linea,column,identify,type){
        super(linea,column);

        this.identify = identify;
        this.type = type;

        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identify} `

        if(this.type.enumType != EnumType.NULL){
            this.translatedCode += `: ${this.type.toString()}`;
        }

        return this.translatedCode;
    }

    getGraphsCode(){
        return this.graphcsCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new nodeTableSymbols(
              this.linea,
              this.column,
              this.identify,
              e.enviromentType,
              null
            )
        );
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}