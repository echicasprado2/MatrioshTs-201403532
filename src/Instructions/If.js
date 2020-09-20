class If extends Instruction {

    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} ifList 
     * @param {*} haveElse 
     * @param {*} blockElse 
     */
    constructor(linea,column,ifList,blockElse,haveElse){
        super(linea,column);

        this.ifList = ifList;
        this.haveElse = haveElse;
        this.blockElse = blockElse;

        this.translatedCode = "";
    }

    getTranslated(){

        for(var i = 0;i<this.ifList.length;i++){
            this.translatedCode += `${this.ifList[i].getTranslated()}`
        }

        if(this.haveElse){
            this.translatedCode += `else${this.blockElse.getTranslated()}`
        }

        return `${this.translatedCode}\n\n`;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "IF",
              null,
              e.enviromentType,
              null
            )
        );
      
        var env = new Environment(e,new EnvironmentType(EnumEnvironmentType.IF,""));
        this.ifList.translatedSymbolsTable(env);
        
        if(this.haveElse){
            this.blockElse.translatedSymbolsTable(env);
        }
    }

    execute(e) {
        //TODO implemented this
        throw new Error("Method not implemented.");
    }

}