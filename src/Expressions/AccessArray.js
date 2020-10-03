class AccessArray extends Expresion {
  /**
   *
   * @param {*} linea
   * @param {*} column
   */
  constructor(linea, column, id, expresion) {
    super(linea, column, null, null);

    this.identifier = id;
    this.value = expresion;

    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode = `${this.identifier}`;

    for (var i = 0; i < this.value.length; i++) {
      this.translatedCode += "[";
      this.translatedCode += this.value[i].getTranslated();
      this.translatedCode += "]";
    }

    if (this.parentesis) {
      return `(${this.translatedCode})`;
    } else {
      return this.translatedCode;
    }
  }

  translatedSymbolsTable(e) {
    return "implementar";
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  getValue(e) {
    var returnValue = new Value(new Type(EnumType.ERROR,null),"Error");
    var resultSymbol;
    var tempValue;

    resultSymbol = e.searchSymbol(this.identifier);

    if(resultSymbol == null){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se encontro el arreglo "${this.identifier}"`,e.enviromentType));
      return returnValue;
    }
    
    if(resultSymbol.type.enumType != EnumType.ARRAY){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la variable: "${this.identifier}" no es un arreglo`,e.enviromentType));
      return returnValue;
    }
    
    if(resultSymbol.dimensions < this.value.length){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la dimensiones de acceso son diferentes a las del arreglo`,e.enviromentType));
      return returnValue;
    }

    tempValue = this.getIndexValue(e,resultSymbol.value.value); 

    if(tempValue == null){
      return returnValue;
    }

    if(tempValue instanceof Expresion){
      returnValue = tempValue.getValue(e);
    }

    returnValue = tempValue;

    return returnValue;
  }

  getIndexValue(e,arrayValue){
    var resultIndex; 
    // var arrayDimension = arrayValue;
    var arrayDimension = arrayValue;

    for(var i = 0; i < this.value.length; i++){
      resultIndex = this.value[i].getValue(e);

      if(resultIndex.value < 0){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el indice es ${resultIndex.value}`,e.enviromentType));
        return null;
      }

      if(resultIndex.value > arrayValue.length){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el indice supera el tamaño del arreglo`,e.enviromentType));
        return null;
      }

      arrayDimension = arrayDimension[resultIndex.value];

    }

    return arrayDimension;
  }

}
