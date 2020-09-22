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
        var result = new Value(new TypeError(EnumType.ERROR,""),"Error");
        var resultExp = this.expresion.getValue(e);
        var enumTypeResultOperation = TreatmentOfPrimitiveTypes.getTopType(resultExp,resultExp);

        if(enumTypeResultOperation === EnumType.ERROR || enumTypeResultOperation === EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de variable no se puede operar ${this.expresion.typ.toString()}`,e.enviromentType));
            return result;            
        }

        if(resultExp.type.enumType == EnumType.NUMBER){

            if(this.operationType == EnumOperationType.PLUS_PLUS){
                var actualizarValor;
                var valorActualizar = new Value(resultExp.type,resultExp.value);
                
                valorActualizar.value++;
                actualizarValor = new Assignment(this.line,this.column,[this.expresion.value[this.expresion.value.length - 1]],valorActualizar);
                actualizarValor.execute(e);
                
                return resultExp;
            }else if(this.operationType == EnumOperationType.MINUS_MINUS){
                var actualizarValor;
                var valorActualizar = new Value(resultExp.type,resultExp.value);
                
                valorActualizar.value--;
                actualizarValor = new Assignment(this.line,this.column,[this.expresion.value[this.expresion.value.length - 1]],valorActualizar);
                actualizarValor.execute(e);

                return resultExp;
            }else if(this.operationType == EnumOperationType.NEGATIVE){
                resultExp.value = Number(resultExp.value) * -1;
                return resultExp;
            }else if(this.operationType == EnumOperationType.NOT){
                if(Number(resultExp.value) > 0){
                    resultExp.type = new Type(EnumType.BOOLEAN);
                    resultExp.value = true;
                }else{
                    resultExp.type = new Type(EnumType.BOOLEAN);
                    resultExp.value = false;
                }
                return resultExp;
            }
        }else if(resultExp.type.enumType == EnumType.BOOLEAN){

            if(this.operationType == EnumOperationType.PLUS_PLUS || this.operationType == EnumOperationType.MINUS_MINUS || this.operationType == EnumOperationType.NEGATIVE){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se se puede realizar la operacion: "${this.operationType.toString()}" a un valor del tipo "${this.resultExp.type.toString()}"`,e.enviromentType));
                return result;
            }else if(this.operationType == EnumOperationType.NOT){
                if(resultExp.value === 'true' || resultExp.value === true){
                    console.log(resultExp.value);
                    resultExp.value = false;
                }else{
                    resultExp.value = true;
                }
                return resultExp;
            }
        }
        return result;
    }
     
 }