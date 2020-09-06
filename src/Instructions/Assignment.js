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
            this.translatedCode += (i == 0) ? this.listAccess[i].getTranslated() : "." + this.listAccess[i].getTranslated(); 
        }
        
        this.translatedCode += " = ";

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