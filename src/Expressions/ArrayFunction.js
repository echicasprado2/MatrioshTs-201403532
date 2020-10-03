class ArrayFunction extends Expresion {
  /**
   *
   * @param {*} linea
   * @param {*} column
   * @param {*} type
   * @param {*} identify
   * @param {*} value
   */
  constructor(linea, column, type, identify, value,isFinal) {
    super(linea, column, null, null);
    this.identify = identify;
    this.type = type;
    this.value = value;
    this.isFinal = isFinal;
  }

  getTranslated() {
    if (this.type.enumType == EnumTypeArrayMethod.PUSH) {
      this.translatedCode += `${this.identify.getTranslated()}.${this.type.toString()}(${this.value.getTranslated()})`;
    } else if(this.type.enumType == EnumTypeArrayMethod.POP) {
      this.translatedCode += `${this.identify.getTranslated()}.${this.type.toString()}()`;
    }else{
      this.translatedCode += `${this.identify.getTranslated()}.${this.type.toString()}`;
    }

    // if (this.parentesis) {
    //   return `(${this.translatedCode})`;
    // } else {
    //   return this.translatedCode;
    // }
    
    if(this.parentesis){
      this.translatedCode = `(${this.translatedCode})`;
    }

    if(this.isFinal){
      this.translatedCode += ";\n";
    }

    return this.translatedCode;

  }

  translatedSymbolsTable(e) {
    return "implementar";
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  getValue(e) {
    var returnValue = new Value(new Type(EnumType.ERROR,null),"Error");
    var resultSymbol = this.identify.value[0].getValue(e);

    if(resultSymbol instanceof Symbol && resultSymbol.type.enumType == EnumType.ERROR){
      return returnValue;
    }

    if(resultSymbol instanceof Symbol && resultSymbol.type.enumType != EnumType.ARRAY){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable no es un array`,e.enviromentType));
      return returnValue;
    }

    if(resultSymbol instanceof Array && resultSymbol[0] instanceof Expresion){
      
      if(this.type.enumType == EnumTypeArrayMethod.POP){
        return resultSymbol.pop().getValue(e);
      
      }else if(this.type.enumType == EnumTypeArrayMethod.LENGTH){
        return new Value(new Type(EnumType.NUMBER,null),resultSymbol.length);
      }

    }else{
      
      if(this.type.enumType == EnumTypeArrayMethod.POP){
        return this.getPop(e,resultSymbol);
  
      }else if(this.type.enumType == EnumTypeArrayMethod.LENGTH){
        return this.getLength(e,resultSymbol);
      
      }else if(this.type.enumType == EnumTypeArrayMethod.PUSH){
        return this.pushValue(e,resultSymbol);
      }

    }

    return returnValue;
  }
  
  getPop(e,symbol){
    var returnValue = symbol.value.value.pop();
    return returnValue;
  }
  
  getLength(e,symbol){
    var returnValue = new Value(new Type(EnumType.NUMBER,null),symbol.value.value.length);
    return returnValue;
  }
  
  pushValue(e,symbol){
    var returnValue = new Value(new Type(EnumType.ERROR,null),"Error");
    var resultValue = this.value.getValue(e);
    
    if(resultValue.type.enumType != symbol.type.identifier){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El valor no es del mismo tipo que el arreglo`,e.enviromentType));
      return returnValue;
    }

    symbol.value.value.push(resultValue);
    
    return new Value(new Type(EnumType.NUMBER,null),symbol.value.value.length);
  }

}
