class Arithmetic extends Expresion {

  /**
   * 
   * @param {*} linea 
   * @param {*} column 
   * @param {*} operationType 
   * @param {*} expresion1 
   * @param {*} expresion2 
   */
  constructor(linea, column, operationType, expresion1, expresion2) {
    super(linea, column);
    this.operationType = operationType;
    this.expresion1 = expresion1;
    this.expresion2 = expresion2;
  
    this.translatedCode = "";
  }

  /**
   * obtener el codigo para la traduccion
   */
  getTranslated() {
    this.translatedCode += this.expresion1.getTranslated();
    this.translatedCode += ` ${this.operationType.toString()} `;
    this.translatedCode += this.expresion2.getTranslated();
    
    if (this.parentesis) {
      return `(${this.translatedCode})`;
    } else {
      return this.translatedCode;
    }
  }

  /**
   *
   * @param {Environment actual} e
   */
  translatedSymbolsTable(e) {
    return "implementar este codigo";
  }

  /**
   *
   * @param {Enviroment} e
   */
  executeSymbolsTable(e) {
    
  }

  getValue(e){
    var result = new Value(new Type(EnumType.ERROR,""),"Error");
    var resultExp1 = this.expresion1.getValue(e);
    var resultExp2 = this.expresion2.getValue(e);

    var enumTypeResultOperation = TreatmentOfPrimitiveTypes.getTopType(resultExp1,resultExp2);

    if(enumTypeResultOperation === EnumType.ERROR || enumTypeResultOperation === EnumType.BOOLEAN){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no se pueden operar ${this.expresion1.type.toString()} ${this.expresion2.type.toString()}`,e.enviromentType));
      return result;
    }
    
    if(enumTypeResultOperation === EnumType.STRING){
      if(this.operationType.enumOperationType == EnumOperationType.PLUS){
        result.type.enumType = enumTypeResultOperation;

        if(resultExp1.value === "@vacio"){
          result.value = resultExp2.value;
        }else if(resultExp2.value === "@vacio"){
          result.value = resultExp1.value;
        }else{
          result.value = resultExp1.value + resultExp2.value;
        }

        return result;
      }else{
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(enumErrorType.SEMATIC),`Tipo de operacion invalidad no se puede realizar ${this.operationType.toString()} con ${enumTypeResultOperation.toString()}`,e.enviromentType));
        return result;
      }
    }

    if(enumTypeResultOperation == EnumType.NUMBER){
      result.type.enumType = enumTypeResultOperation;
      
      if(this.operationType.enumOperationType == EnumOperationType.PLUS){
        result.value = Number(resultExp1.value) + Number(resultExp2.value);

      }else if(this.operationType.enumOperationType == EnumOperationType.MINUS){
        result.value = Number(resultExp1.value) - Number(resultExp2.value);
      
      }else if(this.operationType.enumOperationType == EnumOperationType.MULTIPLICATION){
        result.value = Number(resultExp1.value) * Number(resultExp2.value);
      
      }else if(this.operationType.enumOperationType == EnumOperationType.DIVISION){
        result.value = Number(resultExp1.value) / Number(resultExp2.value);
      
      }else if(this.operationType.enumOperationType == EnumOperationType.POWER){
        result.value = Math.pow(Number(resultExp1.value),Number(resultExp2.value));
      
      }else if(this.operationType.enumOperationType == EnumOperationType.MODULE){
        result.value = Number(resultExp1.value) % Number(resultExp2.value);
      }
    }

    return result;
  }

}
