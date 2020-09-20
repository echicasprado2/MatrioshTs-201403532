/**
 * @class use unario
 */

 class Unary extends Expresion {

    constructor(linea, column, operationType,expresion,isFinal){
        super(linea,column);
        this.operationType = operationType;
        this.expresion = expresion;
        this.isFinal = isFinal;
        this.translatedCode = "";
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){    
        if(this.operationType == EnumOperationType.PLUS_PLUS || this.operationType == EnumOperationType.MINUS_MINUS){
            this.translatedCode += this.expresion.getTranslated();
          this.translatedCode += this.operationType.toString();
        }else{
            this.translatedCode = this.operationType.toString();
            this.translatedCode += this.expresion.getTranslated();
        }

        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            if(this.isFinal){
                return `${this.translatedCode};\n`;
            }else{
                return this.translatedCode;
            }
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
        //TODO implemented this
    }
     
 }