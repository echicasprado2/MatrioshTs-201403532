class AssignmentArray extends Instruction {
    
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} access 
     * @param {*} expresion 
     */
    constructor(linea,column,access,expresion){
        super(linea,column);
        this.nodeName = TreeGraph.getNumberNode();

        this.listAccess = access;
        this.value = expresion;

        this.graphcsCode = TreeGraph;
        this.translatedCode = "";
    }

    getTranslated(){
        for(var i = 0;i < this.listAccess.length;i++){
            this.translatedCode += (i == 0) ? this.listAccess[i].getTranslated() : "." + this.listAccess[i].getTranslated(); 
        }
        
        this.translatedCode += " = ";
        //FIXME no se que hace
        if(this.value instanceof Array){
            for(var i = 0;i < this.value.length;i++){
                if(i == 0){
                    this.translatedCode += this.value[i].getTranslated();
                }else{
                    this.translatedCode += "." + this.value[i].getTranslated();
                }
            }
        }else{
            this.translatedCode += this.value.getTranslated();
        }

        return this.translatedCode + ";\n";
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