/**
 * @class use unario
 */

 class Unary extends Instruction {

    constructor(linea, column, operationType,expresion){
        super(linea,column);
        this.operationType = operationType;
        this.expresion = expresion;
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph.generateOneChield(this,operationType.toString(),this.expresion);
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }
     
 }