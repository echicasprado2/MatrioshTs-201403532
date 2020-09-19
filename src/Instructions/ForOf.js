class ForOf extends Instruction {

    constructor(linea,column,declaration,expression,block){
        super(linea,column);
        
        this.declaration = declaration;
        this.expression = expression;
        this.block = block;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `for(${this.declaration.getTranslated().replace("\n","").replace(";","")} of ${this.expression.getTranslated()})`;
        this.translatedCode += `${this.block.getTranslated()}\n\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new nodeTableSymbols(
              this.linea,
              this.column,
              "FOR",
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.FOR,""));
        this.declaration.translatedSymbolsTable(env);
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