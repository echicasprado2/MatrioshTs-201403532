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
    var result;
    var itemResult;
    var symbolTypeDefinition;
    var newEnvironment;
    
    if(this.type.enumType == EnumType.NULL){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El type no tiene tipo de type definido.`,e.enviromentType));
      return null;
    }else if (this.type.enumType != EnumType.TYPE){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La tipo de dato no es un type`));
    }

    if(this.value == null){
      ErrorList.addError(new ErrorNode(this.line, this.column, new ErrorType(EnumErrorType.SEMANTIC),`Numero de atributos no es igual.`,e.enviromentType));
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
    
    newEnvironment = new Environment(e,new EnvironmentType(EnumEnvironmentType.TYPE),this.type);
      
    for(var i = 0; i < this.ids.length; i++){
      exists = e.searchSymbol(this.ids[i]);
      
      if(exists != null){
        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El nombre del type: "${this.ids[i]}" ya se encuentra en uso`,e.enviromentType));
      }else{
        console.log(symbolTypeDefinition);
        console.log(this.value);
        if(symbolTypeDefinition.value.declarations.length == this.value.length){
          /* TODO
           * + aqui tengo que validar el numero de parametros
           * + luego obtener el objecto typeAttributeDefinition
           *    que me va a decir como se llama el atriburo y el tipo de valor
           * + luego tengo que obtener el valor AttributeTypeAssignment que va a dar el id y el valor
           * + luego tengo que validar que el id de typeAttributoDefinition y el de AttributeTypeAssignment son iguales
           *    si son iguales entonces tengo que guardar el valor en la tabla de simbolos
           * + si encuentro un typeAsignment 
           */
        }
      }
    }
    return null;
  }
}
