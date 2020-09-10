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
        super(0, 0, type, value);
        if (value instanceof Array) {
            this.esArray = true;
        }
        else {
            this.esArray = false;
        }
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph.generateLeafNodeExpresion(this);
        this.translatedCode = value.toString();
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            return this.translatedCode;
        }
    }

    /**
     * obtengo el codigo para agregar al grafo del ast
     */
    getGraphsCode(){
        return this.graphcsCode;
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
