/**
 * @class para la definir types
 *
 */
class DeclarationTypes extends Instruction {

  constructor(linea, column, typeDeclaration, ids, type, value) {
    super(linea, column);

    this.typeDeclaration = typeDeclaration;
    this.ids = ids;
    this.type = type;
    this.value = value;

    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode += `${this.typeDeclaration.toString()} `;

    for (var i = 0; i < this.ids.length; i++) {
      if (i == 0) {
        this.translatedCode += this.ids[i];
      } else {
        this.translatedCode += ", " + this.ids[i];
      }
    }

    if (this.type.enumType != EnumType.NULL) {
      this.translatedCode += ":" + this.type.toString();
    }

    this.translatedCode += " = {";

    if(this.value != null){
      for (var i = 0; i < this.value.length; i++) {
        if (i == this.value.length - 1) {
          this.translatedCode += `${this.value[i].getTranslated()}`;
        } else {
          this.translatedCode += `${this.value[i].getTranslated()},`;
        }
      }
    }

    return `${this.translatedCode}};\n`;
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
    var symbolTypeDefinition;
    var definicion;
    var valor;
    var tmp;
    var valueMap;
    var lengthProp
    
    if(this.type.enumType == EnumType.NULL){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El type no tiene tipo de type definido.`,e.enviromentType));
      return null;

    }else if (this.type.enumType != EnumType.TYPE){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La tipo de dato no es un type`));
    }

    if(this.value == null){
      ErrorList.addError(new ErrorNode(this.line, this.column, new ErrorType(EnumErrorType.SEMANTIC),`No tiene atributos`,e.enviromentType));
      return null;
    }
    
    symbolTypeDefinition = e.searchSymbol(this.type.identifier);

    if(symbolTypeDefinition == null){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El el tipo: "type ${this.type.identifier}" no esta definido.`,e.enviromentType));
      return null;

    }else if(this.type.identifier != symbolTypeDefinition.type.identifier){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El el tipo de type no es el mismo ${this.type.identifier} != ${symbolTypeDefinition.type.identifier}`,e.enviromentType));
      return null;
    }
    
    exists = e.searchSymbol(this.ids[0]);
      
    if(exists != null){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El nombre del type: "${this.ids[i]}" ya se encuentra en uso`,e.enviromentType));
      return null;
    }else{

      lengthProp = symbolTypeDefinition.value.declarations.length;

      if(lengthProp != this.value.length){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Numero de valores no es igual al numero de propiedades`,e.enviromentType));
        return null;
      }
          
      valueMap = new Map();
          
      for(var j = 0; j < lengthProp; j++){
        definicion = symbolTypeDefinition.value.declarations[j];
        valor = this.value[j].execute(e);
          
        if(definicion.identify != valor.identify){
          ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El nombre de la la propiedad no coincide con la del type`,e.enviromentType));
          return null;
        }
        
        tmp = valor.value;
        
        if(tmp.type.enumType != EnumType.NULL){
          
          if(definicion.type.enumType == EnumType.TYPE){
            if(definicion.type.identify != tmp.type.identify){
              ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El valor no es del mismo tipo que la propiedad`,e.enviromentType));
              return null;
            }
          }

          if(definicion.type.enumType != tmp.type.enumType){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El valor no es del mismo tipo que la propiedad`,e.enviromentType));
            return null;
          }

          valueMap.set(definicion.identify,new Value(definicion.type,tmp.value));
        }else{
          valueMap.set(definicion.identify,new Value(definicion.type,tmp.value));
        }
      }

      let insertSymbol = new Symbol(this.line,this.column,this.ids[0],this.type,this.typeDeclaration,new Value(this.type,valueMap),0);
      e.insertNewSymbol(this.ids[0],insertSymbol);
    }
    return null;
  }
}
