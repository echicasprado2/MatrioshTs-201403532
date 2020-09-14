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

        this.nodeName = TreeGraph.getNumberNode();
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

    getGraphsCode(){
        return this.graphcsCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}