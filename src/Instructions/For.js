class For extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} declaration 
     * @param {*} condition 
     * @param {*} expression 
     * @param {*} block 
     */
    constructor(linea,column,declaration,condition,expression,block){
        super(linea,column);

        this.declaration = declaration; // this declaration is Declaration or Assignment or Id
        this.condition = condition;
        this.expression = expression;
        this.block = block;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `for(${this.declaration.getTranslated().replace("\n","").replace(";","")}; ${this.condition.getTranslated()}; ${this.expression.getTranslated()})`;
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