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

        if(type.enumType == EnumType.STRING && value != null){
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
        if(this.type.enumType == EnumType.STRING){
            if(this.value == null){
                this.translatedCode = "\"\"";
            }else{
                this.translatedCode = `"${this.value.toString()}"`;
            }
        }else {
            this.translatedCode = this.value.toString();
        }
        
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

        if(this.type.enumType == EnumType.STRING){
            this.value = this.value.replace(/\\\"/g,"\"");
            this.value = this.value.replace(/\\/g,"\\");
            this.value = this.value.replace(/\\n/g,"\n");
            this.value = this.value.replace(/\\r/g,"\r");
            this.value = this.value.replace(/\\t/g,"\t");
        }
        
        if(this.value == null){
            let nuevoValor = new Value(this.type, "@vacio");
            return nuevoValor;
        }

        return new Value(this.type, this.value);
    }


}
