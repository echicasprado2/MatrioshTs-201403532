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

    getTranslatedCode(){
        return this.translatedCode;
    }


    getValue(e) {
        return new Value(this.type, this.value);
    }
}
