class Print extends Instruction {
    constructor(linea, column, expresion) {
        super(linea, column);
        this.values = expresion;
        this.translatedCode = "";
    }
    
    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
        this.translatedCode = "console.log(";
        for(var i = 0;i < this.values.length;i++){
            this.translatedCode += (i == 0)? this.values[i].getTranslated() : `, ${this.values[i].getTranslated()}`;
        }
        this.translatedCode += ");\n";
        return this.translatedCode;
    }

    /**
     * 
     * @param {Environment actual} e  
     */
    translatedSymbolsTable(e){}

    /**
     * 
     * @param {Enviroment} e 
     */
    executeSymbolsTable(e){
        return "implementar este codigo"
    }

    /**
     * 
     * @param {*} e 
     */
    execute(e) {
        var resultCadena = "";
        var result;

        for(var i = 0; i < this.values.length; i++){
            result = this.values[i].getValue(e);
            if(result != null){
                if(result.type.enumType == EnumType.STRING){
                    result.value = result.value.replace("\"","");
                    result.value = result.value.replace("\"","");
                    result.value = result.value.replace("\'","");
                    result.value = result.value.replace("\'","");
                    result.value = result.value.replace("\`","");
                    result.value = result.value.replace("\`","");
                }
                resultCadena += result.value;
            }else{
                console.log("llega null al print");
            }
        }

        PrintConsole.printLine(resultCadena);
        return null; 
    }
    
}
