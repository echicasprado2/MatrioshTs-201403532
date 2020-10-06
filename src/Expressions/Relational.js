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

    var result = new Value(new Type(EnumType.BOOLEAN,null),false);
    var resultExp1 = this.expresion1.getValue(e);
    var resultExp2 = this.expresion2.getValue(e);
    var enumTypeResultExpresitions = TreatmentOfPrimitiveTypes.getTopType(resultExp1,resultExp2);

    if(resultExp1 == undefined || 
      resultExp2 == undefined || 
      resultExp1 instanceof Value && resultExp1.type.enumType == EnumType.ERROR || 
      resultExp2 instanceof Value && resultExp2.type.enumType == EnumType.ERROR){
      return result;
    }
    

    if(enumTypeResultExpresitions === EnumType.ERROR){
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no se pueden operar ${this.expresion1.type.toString()} ${this.expresion2.type.toString()}`,e.enviromentType));
      return result;
    }
    
    result.type = new Type(EnumType.BOOLEAN,"");

    if(enumTypeResultExpresitions == EnumType.NUMBER){
      
      if(this.operationType == EnumOperationType.DIFFERENT_THAN){
        result.value = Number(resultExp1.value) != Number(resultExp2.value); 

      }else if(this.operationType == EnumOperationType.LIKE_THAN){
        result.value = Number(resultExp1.value) == Number(resultExp2.value);

      }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
          result.value = Number(resultExp1.value) >= Number(resultExp2.value);
      
      }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
        result.value = Number(resultExp1.value) <= Number(resultExp2.value);

      }else if(this.operationType == EnumOperationType.MORE_THAN){
        result.value = Number(resultExp1.value) > Number(resultExp2.value);

      }else if(this.operationType == EnumOperationType.LESS_THAN){
        result.value = Number(resultExp1.value) < Number(resultExp2.value);
      }
      
    }else if(enumTypeResultExpresitions == EnumType.STRING || enumTypeResultExpresitions === EnumType.BOOLEAN){
      
      if(this.operationType == EnumOperationType.DIFFERENT_THAN){
        result.value = resultExp1.value != resultExp2.value; 
  
      }else if(this.operationType == EnumOperationType.LIKE_THAN){
        result.value = resultExp1.value == resultExp2.value;
  
      }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
          result.value = Number(resultExp1.value) >= Number(resultExp2.value);
      
      }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
        result.value = resultExp1.value <= resultExp2.value;
  
      }else if(this.operationType == EnumOperationType.MORE_THAN){
        result.value = resultExp1.value > resultExp2.value;
  
      }else if(this.operationType == EnumOperationType.LESS_THAN){
        result.value = resultExp1.value < resultExp2.value;
      }
      
    }else if(enumTypeResultExpresitions == EnumType.TYPE){
      let value1, value2;

      if(resultExp1 instanceof Symbol){
        value1 = resultExp1.value;

      }else if(resultExp1 instanceof Value){
        value1 = resultExp1;
      }

      if(resultExp2 instanceof Symbol){
        value2 = resultExp2.value;

      }else if(resultExp2 instanceof Value){
        value2 = resultExp2;
      }

      if(value1.type.enumType == EnumType.TYPE && value2.type.enumType == EnumType.TYPE){

        if(value1.type.identifier == value2.type.identifier){

          if(this.operationType == EnumOperationType.DIFFERENT_THAN){
            result.value = value1.value != value2.value; 
      
          }else if(this.operationType == EnumOperationType.LIKE_THAN){
            result.value = value1.value == value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
              result.value = Number(value1.value) >= Number(value2.value);
          
          }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
            result.value = value1.value <= value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_THAN){
            result.value = value1.value > value2.value;
      
          }else if(this.operationType == EnumOperationType.LESS_THAN){
            result.value = value1.value < value2.value;
          }

        }

      }else if(value1.type.enumType == EnumType.TYPE && !(value2.type.enumType == EnumType.TYPE)){

        if(value2.type.enumType == EnumType.NULL || value1.type.identifier == value2.type.enumType){

          if(this.operationType == EnumOperationType.DIFFERENT_THAN){
            result.value = value1.value != value2.value; 
      
          }else if(this.operationType == EnumOperationType.LIKE_THAN){
            result.value = value1.value == value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
              result.value = Number(value1.value) >= Number(value2.value);
          
          }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
            result.value = value1.value <= value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_THAN){
            result.value = value1.value > value2.value;
      
          }else if(this.operationType == EnumOperationType.LESS_THAN){
            result.value = value1.value < value2.value;
          }

        }else{
          console.log("Error de tipos en types")
        }


      }else if(!(value1.type.enumType == EnumType.TYPE) && value2.type.enumType == EnumType.TYPE){

        if(value1.type.enumType == EnumType.NULL || value1.type.enumType == value2.type.identifier){

          if(this.operationType == EnumOperationType.DIFFERENT_THAN){
            result.value = value1.value != value2.value; 
      
          }else if(this.operationType == EnumOperationType.LIKE_THAN){
            result.value = value1.value == value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_EQUAL_TO){ 
              result.value = Number(value1.value) >= Number(value2.value);
          
          }else if(this.operationType == EnumOperationType.LESS_EQUAL_TO){
            result.value = value1.value <= value2.value;
      
          }else if(this.operationType == EnumOperationType.MORE_THAN){
            result.value = value1.value > value2.value;
      
          }else if(this.operationType == EnumOperationType.LESS_THAN){
            result.value = value1.value < value2.value;
          }

        }else{
          console.log("Error de tipos en types")
        }

      }

    }
    
    return result;
  }
}
