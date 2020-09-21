class Relational extends Expresion {
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
  getValue(e) {
    //TODO implemented this
    var result = new Value(new Type(EnumType.ERROR,""),"Error");
    var resultExp1 = this.expresion1.getValue(e);
    var resultExp2 = this.expresion2.getValue(e);
    var enumTypeResultExpresitions = TreatmentOfPrimitiveTypes.getTopType(this.expresion1,this.expresion2);
    
    if(enumTypeResultExpresitions === EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(enumErrorType.SEMATIC),`Los tipos de variables no se pueden operar ${this.expresion1.Type.toString()} ${this.expresion2.Type.toString()}`,e.enviromentType));
      return result;
    }
    
    result.type = new Type(EnumType.BOOLEAN,"");

    if(this.operationType == EnumOperationType.DIFFERENT_THAN){
      result.value = resultExp1.value != resultExp2.value; 
    }else if(this.operationType == EnumOperationType.LIKE_THAN){
      result.value = resultExp1.value == resultExp2.value;
    }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){
      result.value = resultExp1.value >= resultExp2.value;
    }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
      result.value = resultExp1.value <= resultExp2.value;
    }else if(this.operationType == EnumOperationType.MORE_THAN){
      result.value = resultExp1.value > resultExp2.value;
    }else if(this.operationType == EnumOperationType.LESS_THAN){
      result.value = resultExp1.value < resultExp2.value;
    }

    return result;
  }
}
