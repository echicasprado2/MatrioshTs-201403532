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
        // this.nodeName = Static.treeGraph.getNumberNode();
        // this.graphcsCode = Static.treeGraph.generateLeafNodeExpresion(this);
    }
    getValue(e) {
        return new Value(this.type, this.value);
    }
}
