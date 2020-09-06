/**
 * @class use unario
 */

 class Unary extends Expresion {

    constructor(linea, column, operationType,expresion){
        super(linea,column);
        this.operationType = operationType;
        this.expresion = expresion;
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = "";//TreeGraph.generateOneChield(this,this.operationType.toString(),this.expresion);
        this.translatedCode = "";
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){


        if(this.operationType == EnumOperationType.PLUS_PLUS || this.operationType == EnumOperationType.MINUS_MINUS){
            for(var i = 0;i < this.expresion.length;i++){
                this.translatedCode += (i == 0) ? this.expresion[i].getTranslated() : "." + this.expresion[i].getTranslated(); 
            }
            
            this.translatedCode += this.operationType.toString();
        }else{
            this.translatedCode = this.operationType.toString();

            for(var i = 0;i < this.expresion.length;i++){
                this.translatedCode += (i == 0) ? this.expresion[i].getTranslated() : "." + this.expresion[i].getTranslated(); 
            }
        }

        return this.translatedCode;
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
        
    }
     
 }