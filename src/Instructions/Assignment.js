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
        this.translatedCode = "";
    }

    getTranslated(){
        for(var i = 0;i < this.listAccess.length;i++){
            this.translatedCode += (i == 0) ? this.listAccess[i].getTranslated() : "." + this.listAccess[i].getTranslated(); 
        }
        
        this.translatedCode += " = ";
        
        console.log(this.value);
        if(this.value instanceof Array){
            this.translatedCode += "[";
            for(var i = 0;i < this.value.length;i++){
                if(i == 0){
                    this.translatedCode += this.value[i].getTranslated();
                }else{
                    this.translatedCode += "," + this.value[i].getTranslated();
                }
            }
            this.translatedCode += "]";
        }else{
            this.translatedCode += this.value.getTranslated();
        }

        return this.translatedCode + ";\n";
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        //TODO implemented this
        throw new Error("Method not implemented.");
    }

}