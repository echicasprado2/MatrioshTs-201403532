class Declaration extends Instruction {
  /**
   *
   * @param {*} linea
   * @param {*} column
   * @param {*} typeDeclaration
   * @param {*} ids
   * @param {*} type
   * @param {*} value
   */
  constructor(linea, column, typeDeclaration, ids, type, value) {
    super(linea, column);

    this.typeDeclaration = typeDeclaration;
    this.ids = ids;
    this.type = type;
    this.value = value;

    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode += this.typeDeclaration.toString() + " ";

    for (var i = 0; i < this.ids.length; i++) {
      if (i == 0) {
        this.translatedCode += this.ids[i];
      } else {
        this.translatedCode += ", " + this.ids[i];
      }
    }

    if (this.type.enumType != EnumType.NULL) {
      this.translatedCode += ":" + this.type.toString();
    } else {
      this.translatedCode;
    }

    if (this.value != null) {

      this.translatedCode += " = "

      if (this.value instanceof Array) {
        this.translatedCode += this.getValueArray(this.value);
      
      } else {
        this.translatedCode +=   this.value.getTranslated();
      }
    
    }
    return this.translatedCode + ";\n";
  }

  getValueArray(value){
    var cadena = "[";

    for(var i = 0; i < value.length; i++){
        if(value[i] instanceof Array && i == 0){
            cadena += `${this.getValueArray(value[i])}`;
        }else if(value[i] instanceof Array){
            cadena += `,${this.getValueArray(value[i])}`;
        }else if(i == 0){
            cadena += value[i].value;
        }else{
            cadena += `,${value[i].value}`;
        }            
    }
    
    cadena += "]";
    return cadena;
}

  translatedSymbolsTable(e) {
    for (var i = 0; i < this.ids.length; i++) {
      TableReport.addTranslated(
        new NodeTableSymbols(
          this.line,
          this.column,
          this.ids[i],
          this.type,
          e.enviromentType,
          null
        )
      );
    }
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  execute(e) {
    var result;

    if (this.typeDeclaration.enumType == EnumDeclarationType.CONST) {
      if (this.value == null) {
        for (var i = 0; i < this.ids.length; i++) {
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La constante: "${this.ids[i]}" no tiene asignacion de un valor, debe tener valor`,e.enviromentType));
        }
        return null;
      }
    }
      
    if(this.value != null){

      if(this.value instanceof Array){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`no se puede asignar un array a una variable`,e.enviromentType));
        return null;
      }

      result = this.value.getValue(e);
      
      if(result.type.enumType == EnumType.ERROR){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor da error`,e.enviromentType));
        return null;
      }
        
      if(result.type.enumType == EnumType.ARRAY){
        for(var i = 0; i < this.ids.length; i++){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`la variable ${this.ids[i]} no soporta un array`,e.enviromentType));
        }
        return null;  
      }

    }else{
      result = null;
    }
    
    for(var i = 0; i < this.ids.length; i++){

      if(result == null){
        e.insertNewSymbol(this.ids[i],new Symbol(this.line,this.column,this.ids[i],this.type,this.typeDeclaration,new Value(new Type(EnumType.NULL,null),"",0)));
      }else{
        /* TODO en esta parte tengo que validar el tipo type y el identifier y como result es un value tengo que guardar solo el valor del value y no el simbolo
            esto porque cuando busco un type con un identificar este me retorna el symbolo y no el valor
        */
        if(this.type.enumType == EnumType.NULL){
          this.type = result.type;
          e.insertNewSymbol(this.ids[i],new Symbol(this.line,this.column,this.ids[i],this.type,this.typeDeclaration,result,0));
        }else if(this.type.enumType != result.type.enumType){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de la variable no es el mismo que su valor : ${this.type.toString()} != ${result.type.toString()}`,e.enviromentType));
        }else{
          e.insertNewSymbol(this.ids[i],new Symbol(this.line,this.column,this.ids[i],this.type,this.typeDeclaration,result,0));
        }
      }

    }

    return null;
  }
}
