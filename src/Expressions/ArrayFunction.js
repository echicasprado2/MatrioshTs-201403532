class ArrayFunction extends Expresion {
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} type 
     * @param {*} identify 
     * @param {*} value 
     */
    constructor(linea,column,type,identify,value){
        super(linea,column,null,null);
        this.identify = identify;
        this.type = type;
        this.value = value;
    }

    getTranslated(){
        console.log(this.identify);
        console.log(this.type);
        console.log(this.value);

        // TODO MAKE FOR PUSH, POP AND LENGTH
        if(this.type.enumType == EnumTypeArrayMethod.PUSH){
            
        }

        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            return this.translatedCode;
        }
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

    getValue(e) {
        throw new Error("Method not implemented.");
    }

}