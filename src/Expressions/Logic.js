class Logic extends Expresion {
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
    var result = new Value(new Type(EnumType.ERROR,""),"Error");
    var resulExp1 = this.expresion1.getValue(e);
    var resulExp2 = this.expresion2.getValue(e);

    if(resulExp1 == null || 
      resulExp2 == null || 
      resulExp1 instanceof Value && resulExp1.type.enumType == EnumType.ERROR || 
      resulExp2 instanceof Value && resulExp2.type.enumType == EnumType.ERROR){
      return result;
    }

    if(resulExp1.type.enumType != EnumType.BOOLEAN || resulExp2.type.enumType != EnumType.BOOLEAN){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se puede operar tipos diferentes a boolean`,e.envrimentType));
      return result;
    }

    result.type = resulExp1.type;

    if(this.operationType == EnumOperationType.AND){
      result.value = resulExp1.value && resulExp2.value;
    }else if(this.operationType == EnumOperationType.OR){
      result.value = resulExp1.value || resulExp2.value;
    }
    
    return result;
  }
}
