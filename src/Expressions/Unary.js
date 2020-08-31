/**
 * @class use unario
 */

 class Unary extends Expresion {

    constructor(linea, column, operationType,expresion){
        super(linea,column);
        this.operationType = operationType;
        this.expresion = expresion;
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph.generateOneChield(this,this.operationType.toString(),this.expresion);
        
        if(this.operationType == EnumOperationType.PLUS_PLUS || this.operationType == EnumOperationType.MINUS_MINUS){
            this.translatedCode = this.expresion.translatedCode + this.operationType.toString();
        }else{
            this.translatedCode = this.operationType.toString() + this.expresion.translatedCode;
        }
    }

    getTranslatedCode(){
        return this.translatedCode;
    }

    getValue(e) {
        
    }
     
 }