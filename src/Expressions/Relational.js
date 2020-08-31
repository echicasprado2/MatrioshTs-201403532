class Relational extends Expresion{
    constructor(linea, column,operationType,expresion1,expresion2){
        super(linea,column);
        this.operationType = operationType;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
        this.nodeName = TreeGraph.getNumberNode();
        let chieldren = [expresion1,expresion2];
        this.graphcsCode = TreeGraph.generateChieldren(this,operationType.toString(),chieldren);
        this.translatedCode = this.expresion1.translatedCode + " " 
            + this.operationType.toString() + " " 
            +this.expresion2.translatedCode;
    }

    getValue(e) {
        return new Value(this.type, this.value);
    }
}