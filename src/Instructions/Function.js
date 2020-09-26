class Function extends Instruction {
  /**
   *
   * @param {*} line
   * @param {*} column
   * @param {*} identifier
   * @param {*} Parameters
   * @param {*} type
   */
  constructor(line, column, identifier, Parameters, type) {
    super(line, column);
    this.identifier = identifier;
    this.parameters = Parameters || [];
    this.instructions = []; //array de instrucciones
    this.type = type;

    this.translatedCode = "";
    this.nestedFunctions = [];
    this.chieldren = [];
    this.numberSentence = 0;

    this.copyIdentifierOfDeclarations = [];
    this.copyIdentifierOfNestedFuncions = [];
  }

  /**
   *
   * @param {*} instruction
   */
  addInstruction(instruction) {
    this.instructions.push(instruction);
    this.chieldren.push({
      numberSentence: this.numberSentence,
      instruction: instruction,
    });
    this.numberSentence++;
  }

  /**
   *
   * @param {*} nested
   */
  addFunction(nested) {
    this.nestedFunctions.push(nested);
    this.chieldren.push({
      numberSentence: this.numberSentence,
      instruction: nested,
    });
    this.numberSentence++;
  }

  /**
   * obtener el codigo para la traduccion
   */
  getTranslated() {
    var codeParams = "";
    var codeNestedFunction = "";

    this.getCopyIdentifierOfDeclarations();
    this.getCopyIdentifierOfNestedFuncion();

    this.changeNameOfNestedFunction();
    this.addParamsInNestedFunction();
    this.addValuesForCallFunction();
    this.changeNameAndAddParamsOfNestedFunctions();

    codeParams = this.getCodeOfParams();
    codeNestedFunction = this.getCodeOfNestedFunction();

    this.translatedCode += `function ${this.identifier}(`;
    this.translatedCode += codeParams;
    this.translatedCode += `):`;

    if(this.type.enumType == EnumType.ARRAY){
      var getTypeArray = this.type.identifier.split("_");
      var numberDimensions = Number(getTypeArray[1]);

      this.translatedCode += getTypeArray[0].toLowerCase();

      for(var i = 0; i < numberDimensions; i++){
        this.translatedCode += "[]";
      }

      this.translatedCode += "{\n";

    }else{
      this.translatedCode += `${this.type.toString()}{\n`;
    }

    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      if (!(item instanceof Function)) {
        this.translatedCode += item.getTranslated();
      }
    }

    this.translatedCode += "}\n\n";
    this.translatedCode += codeNestedFunction;
    return this.translatedCode;
  }

  getCopyIdentifierOfDeclarations() {
    var item;
    this.copyIdentifierOfDeclarations = [];

    for (var i = 0; i < this.chieldren.length; i++) {
      item = this.chieldren[i].instruction;

      if (item instanceof Declaration) {
        for (var j = 0; j < item.ids.length; j++) {
          this.copyIdentifierOfDeclarations.push(item.ids[j]);
        }
      }
    }
  }

  getCopyIdentifierOfNestedFuncion() {
    this.copyIdentifierOfNestedFuncions = [];
    for (var i = 0; i < this.nestedFunctions.length; i++) {
      this.copyIdentifierOfNestedFuncions.push(
        this.nestedFunctions[i].identifier
      );
    }
  }

  changeNameOfNestedFunction() {
    for (var i = 0; i < this.nestedFunctions.length; i++) {
      var item = this.nestedFunctions[i];
      item.identifier = `${this.identifier}_${item.identifier}`;
    }
  }

  getCodeOfNestedFunction() {
    var code = "";
    for (var i = 0; i < this.nestedFunctions.length; i++) {
      var item = this.nestedFunctions[i];
      code += item.getTranslated();
    }
    return code;
  }

  getCodeOfParams() {
    var item;
    var code = "";

    for (var i = 0; i < this.parameters.length; i++) {
      item = this.parameters[i];
      code += item.getTranslated();
      if (!(i == this.parameters.length - 1)) {
        code += ",";
      }
    }
    return code;
  }

  addParamsInNestedFunction() {
    var declarationInFunction = []; //lista de parametros

    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;

      if (item instanceof Declaration) {
        for (var j = 0; j < item.ids.length; j++) {
          if (item.type.enumType == EnumType.NULL) {
            declarationInFunction.push(
              new Parameter(
                item.linea,
                item.column,
                item.ids[j],
                new Type(EnumType.VOID),
                null
              )
            );
          } else {
            declarationInFunction.push(
              new Parameter(
                item.linea,
                item.column,
                item.ids[j],
                item.type,
                null
              )
            );
          }
        }
      }
    }

    // parametros del padre
    for (var i = 0; i < this.nestedFunctions.length; i++) {
      var item = this.nestedFunctions[i];

      for (var j = 0; j < this.parameters.length; j++) {
        item.parameters.push(this.parameters[j]);
      }

      for (var j = 0; j < declarationInFunction.length; j++) {
        item.parameters.push(declarationInFunction[j]);
      }
    }
  }

  addValuesForCallFunction() {
    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      if (item instanceof CallFunction) {
        for (var j = 0; j < this.copyIdentifierOfNestedFuncions.length; j++) {
          if (item.identifier === this.copyIdentifierOfNestedFuncions[j]) {
            item.identifier = `${this.identifier}_${item.identifier}`;

            for (var k = 0; k < this.parameters.length; k++) {
              item.value.push(
                new Id(this.line, this.column, this.parameters[k].identifier)
              );
            }

            for (var k = 0; k < this.copyIdentifierOfDeclarations.length; k++) {
              item.value.push(
                new Id(
                  this.line,
                  this.column,
                  this.copyIdentifierOfDeclarations[k]
                )
              );
            }
          }
        }
      }
    }
  }

  changeNameAndAddParamsOfNestedFunctions() {
    var item;
    for (var i = 0; i < this.chieldren.length; i++) {
      item = this.chieldren[i].instruction;
      if (!(item instanceof Function)) {
        this.changeNameOfCallFunctionsIntoSentences(item);
      }
    }
  }

  changeNameOfCallFunctionsIntoSentences(node) {
    if (node instanceof Declaration) {
      this.changeNameOfCallFunctionsIntoSentences(node.value);

    }else if(node instanceof If){
      for(var i = 0; i < node.ifList.length;i++){
        this.changeNameOfCallFunctionsIntoSentences(node.ifList[i]);
      }

      if(node.haveElse){
        this.changeNameOfCallFunctionsIntoSentences(node.blockElse);
      }

    } else if (node instanceof Assignment){
      this.changeNameOfCallFunctionsIntoSentences(node.value);

    } else if (node instanceof AssignmentArray){
      this.changeNameOfCallFunctionsIntoSentences(node.value);

    } else if (node instanceof Block){
      for(var i = 0; i < node.sentences.length; i++){
        this.changeNameOfCallFunctionsIntoSentences(node.sentences[i]);
      }
    } else if (node instanceof BlockIf){
      this.changeNameOfCallFunctionsIntoSentences(node.expresion);

      for(var i = 0; i < node.block.length; i++){
        this.changeNameOfCallFunctionsIntoSentences(node.sentences[i]);
      }

    } else if (node instanceof CaseSwitch){
      if(node.isCase){
        this.changeNameOfCallFunctionsIntoSentences(node.expression);
      }

      if(node.haveBlock){
        this.changeNameOfCallFunctionsIntoSentences(node.block);
      }
      
    } else if (node instanceof DeclarationArray){
      var obj;
      for(var i = 0; i < node.values.length;i ++){
        obj = node.values[i]; // lista de E
        for(var j =0; j < obj.length; j++){
          this.changeNameOfCallFunctionsIntoSentences(obj[j]);
        }
      }

    } else if (node instanceof Do){
      this.changeNameOfCallFunctionsIntoSentences(node.expression);
      this.changeNameOfCallFunctionsIntoSentences(node.block);

    } else if (node instanceof For){
      this.changeNameOfCallFunctionsIntoSentences(node.declaration);
      this.changeNameOfCallFunctionsIntoSentences(node.condition);
      this.changeNameOfCallFunctionsIntoSentences(node.expression);
      this.changeNameOfCallFunctionsIntoSentences(node.block);
      
    } else if (node instanceof ForIn){
      this.changeNameOfCallFunctionsIntoSentences(node.declaration);
      this.changeNameOfCallFunctionsIntoSentences(node.expression);
      this.changeNameOfCallFunctionsIntoSentences(node.block);

    } else if (node instanceof ForOf){
      this.changeNameOfCallFunctionsIntoSentences(node.declaration);
      this.changeNameOfCallFunctionsIntoSentences(node.expression);
      this.changeNameOfCallFunctionsIntoSentences(node.block);
    
    } else if (node instanceof Print){
      for(i = 0; i < node.values.length; i++){
        this.changeNameOfCallFunctionsIntoSentences(node.values[i]);
      }
    
    } else if (node instanceof Return){
      if(node.returnExpresion){
        this.changeNameOfCallFunctionsIntoSentences(node.expression);
      }

    } else if (node instanceof Switch){
      this.changeNameOfCallFunctionsIntoSentences(node.condition);
      for(var i =0; i < node.casesList.length; i++){
        this.changeNameOfCallFunctionsIntoSentences(node.casesList[i]);
      }

    } else if (node instanceof TypeAssignment){
      for(var i = 0; i < node.attributes.length; i++){
        this.changeNameOfCallFunctionsIntoSentences(node.attributes[i]);
      }

    } else if (node instanceof AttributeTypeAssignment){
      this.changeNameOfCallFunctionsIntoSentences(node.value);

    } else if (node instanceof While){
      this.changeNameOfCallFunctionsIntoSentences(node.condition);
      this.changeNameOfCallFunctionsIntoSentences(node.block);

    } else if (node instanceof Access){
      for(var i = 0; i < node.value.length; i++){
        this.changeNameOfCallFunctionsIntoSentences(node.value[i]);
      }

    } else if (node instanceof AccessArray){
      for(var i = 0;i < node.value.length;i++){
        this.changeNameOfCallFunctionsIntoSentences(node.value[i]);
      }

    } else if (node instanceof Arithmetic){
      this.changeNameOfCallFunctionsIntoSentences(node.expresion1);
      this.changeNameOfCallFunctionsIntoSentences(node.expresion2);

    } else if (node instanceof Logic){
      this.changeNameOfCallFunctionsIntoSentences(node.expresion1);
      this.changeNameOfCallFunctionsIntoSentences(node.expresion2);

    } else if (node instanceof Relational){
      this.changeNameOfCallFunctionsIntoSentences(node.expresion1);
      this.changeNameOfCallFunctionsIntoSentences(node.expresion2);

    } else if (node instanceof Ternary){
      this.changeNameOfCallFunctionsIntoSentences(node.condition);
      this.changeNameOfCallFunctionsIntoSentences(node.conditionTrue);
      this.changeNameOfCallFunctionsIntoSentences(node.conditionFalse);

    } else if (node instanceof Unary){
      this.changeNameOfCallFunctionsIntoSentences(node.expresion);

    } else if (node instanceof CallFunction) {
      for (var j = 0; j < this.copyIdentifierOfNestedFuncions.length; j++) {
        if (node.identifier === this.copyIdentifierOfNestedFuncions[j]) {
          node.identifier = `${this.identifier}_${node.identifier}`;

          for (var k = 0; k < this.parameters.length; k++) {
            node.value.push(new Id(this.line, this.column, this.parameters[k].identifier));
          }

          for (var k = 0; k < this.copyIdentifierOfDeclarations.length; k++) {
            node.value.push(new Id(this.line,this.column,this.copyIdentifierOfDeclarations[k]));
          }
        }
      }
    }
  }

  /**
   *
   * @param {Environment actual} e
   */
  translatedSymbolsTable(e) {
    TableReport.addTranslated(
      new NodeTableSymbols(
        this.line,
        this.column,
        this.identifier,
        null,
        e.enviromentType,
        null
      )
    );

    var envFunction = new Environment(e,new EnvironmentType(EnumEnvironmentType.FUNCTION, this.identifier));

    for (var i = 0; i < this.instructions.length; i++) {
      this.instructions[i].translatedSymbolsTable(envFunction);
    }

    for (var i = 0; i < this.nestedFunctions.length; i++) {
      this.nestedFunctions[i].translatedSymbolsTable(envFunction);
    }
  }

  /**
   *
   * @param {Enviroment} e
   */
  executeSymbolsTable(e) {
    return "implementar este codigo";
  }

  /**
   *
   * @param {Environment} e
   */
  execute(e) {

    // TODO save array parameters
    var exists = e.searchSymbol(this.identifier);
    var dimencions = 0;
    
    if(this.type.enumType == EnumType.ARRAY){
      var realtype = this.type.identifier.split("_");
      this.type.identifier = realtype[0];
      dimencions = realtype[1];
    }

    if(exists == null){
      this.instructions = new Block(this.instructions);
      e.insert(this.identifier,new Symbol(this.line,this.column,this.identifier,new Type(EnumType.FUNCTION), new DeclarationType(EnumDeclarationType.NULL),this,dimencions));
    }else{
      ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La funcion: "${this.identifier}" ya se encuentra definida`,e.enviromentType));
    }

    return null;
  }
}
