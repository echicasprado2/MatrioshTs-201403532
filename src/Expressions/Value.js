/**
 * @class use this class for save all value
 */
class Value extends Expresion {
    /**
     *
     * @param type - Type
     * @param value - Object
     *
     */
    constructor(type, value) {

        if(type.enumType == EnumType.STRING){
            value = value.replace("\"","");
            value = value.replace("\"","");
            value = value.replace("\'","");
            value = value.replace("\'","");
            value = value.replace("\`","");
            value = value.replace("\`","");
        }

        super(0, 0, type, value);
        if (value instanceof Array) {
            this.esArray = true;
        }
        else {
            this.esArray = false;
        }
        
        this.translatedCode = "";
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
        this.translatedCode = (this.type.enumType == EnumType.STRING) ? `"${this.value.toString()}"` : this.value.toString();
        
        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            return this.translatedCode;
        }
    }

    /**
     * 
     * @param {Environment actual} e  
     */
    translatedSymbolsTable(e){
        return "implementar este codigo";
    }

    /**
     * 
     * @param {Enviroment} e 
     */
    executeSymbolsTable(e){
        return "implementar este codigo"
    }

    getValue(e) {
        return new Value(this.type, this.value);
    }


}
