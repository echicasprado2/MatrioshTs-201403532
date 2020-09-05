class Assignment extends Instruction {
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} access 
     * @param {*} expresion 
     */
    constructor(linea,column,access,expresion){
        super(linea,column);
        this.listAccess = access;
        this.value = expresion;
        this.nodeName = TreeGraph.getNumberNode();
        // TODO no me sale la grafica de asignar
        // tengo que crear un metodo para generar la grafica
        this.graphcsCode = TreeGraph.generateChieldren(this,"ASIGNACION",);
        this.translatedCode = "";
    }

    getTranslated(){
        for(var i = 0;i < this.listAccess.length;i++){
            console.log(this.listAccess[i]);
            this.translatedCode += (i == 0) ? this.listAccess[i].value : "." + this.listAccess[i].value; 
        }
        this.translatedCode += " = " + this.value.getTranslated();
        return this.translatedCode + ";\n";
    }

    getGraphsCode(){
        //return this.graphcsCode;
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