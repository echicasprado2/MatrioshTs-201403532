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
      if (this.value instanceof Array) {
        for (var i = 0; i < this.value.length; i++) {
          if (i == 0) {
            this.translatedCode += " = " + this.value[i].getTranslated();
          } else {
            this.translatedCode += "." + this.value[i].getTranslated();
          }
        }
      } else {
        this.translatedCode += " = " + this.value.getTranslated();
      }
    }
    return this.translatedCode + ";\n";
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

    var exists;
    
    if (this.typeDeclaration.enumType == EnumDeclarationType.CONST) {
      if (this.value == null) {
        for (var i = 0; i < this.ids.length; i++) {
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La constante: "${this.ids[i]}" no tiene asignacion de un valor, debe tener valor`,e.enviromentType));
          return null;
        }
      }
    }
    
    for(var i = 0; i < this.ids.length; i++){
  
      exists = e.searchSymbol(this.ids[i]);
  
      if (exists != null) {
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error La variable: "${this.ids[i]}" ya se encuentra definida`,e.enviromentType));
      }else{
        
        if(this.value == null){
          e.insert(this.ids[i],new Symbol(this.ids[i],this.type,this.typeDeclaration,null));
          TableReport.addExecute(
            new NodeTableSymbols(this.line,this.column,this.ids[i],this.type,e.enviromentType,null)
            );
          }else{
            var result  = this.value.getValue(e);
            
            if(this.type.enumType == EnumType.NULL){
              this.type = result.type;
              e.insert(this.ids[i],new Symbol(this.ids[i],new Type(EnumType.VARIABLE),this.typeDeclaration,result));
              TableReport.addExecute(new NodeTableSymbols(this.line,this.column,this.ids[i],this.type,e.enviromentType,result.value));
            }else if(this.type.enumType != result.type.enumType){
              ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El tipo de la variable no es el mismo que su valor : ${this.type.toString()} != ${result.type.toString()}`,e.enviromentType));
              return null;
            }else{
              e.insert(this.ids[i],new Symbol(this.ids[i],new Type(EnumType.VARIABLE),this.typeDeclaration,result));
              TableReport.addExecute(new NodeTableSymbols(this.line,this.column,this.ids[i],this.type,e.enviromentType,result.value));
            }

        }

      }
    }
    return null;
  }
}
