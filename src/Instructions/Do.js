class Do extends Instruction {

    constructor(linea,column,block,expression){
        super(linea,column);

        this.expression = expression;
        this.block = block;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `do ${this.block.getTranslated()}while(${this.expression.getTranslated()});\n\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new nodeTableSymbols(
              this.linea,
              this.column,
              "DO",
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.DO,""));
        this.expression.translatedSymbolsTable(env);
        this.block.translatedSymbolsTable(env);
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}