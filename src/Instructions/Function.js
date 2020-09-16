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
    this.nodeName = TreeGraph.getNumberNode();// TODO eliminar
    this.graphcsCode = "";// TODO eliminar
    this.translatedCode = "";
    this.nestedFunctions = [];
    this.chieldren = [];
    this.numberSentence = 0;
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

    /* TODO tengo que hacer una copia de las declaraciones en el entorno de funcion
      luego las declaraciones tengo que cambiarles el nombre
      luego tengo que buscar las asignaciones, id o llamadas de funcion que conicidan los 
      nombres de declaraciones que guardo y tengo que cambiarles el nombre
    */
    var codeDeclaration = "";
    var codeNestedFunction = "";
    var codeParams = "";
    var copyDeclaration = [];

    copyDeclaration = this.getCopyDeclaration();
    // this.changeNameOfDeclaration();
    this.changeNameOfNestedFunction();
    this.addParamsInNestedFunction();

    codeDeclaration = this.getCodeOfDeclaration();
    codeParams = this.getCodeOfParams();
    codeNestedFunction = this.getCodeOfNestedFunction();

    this.translatedCode += `function ${this.identifier}(`;
    this.translatedCode += codeParams;
    this.translatedCode += `):${this.type.toString()}{\n`;
    this.translatedCode += codeDeclaration;

    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      if (!(item instanceof Function) && !(item instanceof Declaration)) {
        this.translatedCode += item.getTranslated();
      }
    }

    this.translatedCode += "}\n\n";
    this.translatedCode += codeNestedFunction;
    return this.translatedCode;
  }

  getCopyDeclaration() {
    var copyDeclaration = [];

    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      
      if (item instanceof Function) {
        copyDeclaration.push(item.identifier); 
      }else if(item instanceof Declaration){
        for(var j = 0; j < item.ids.length;j++){
          copyDeclaration.push(item.ids[j]);
        }
      }
    }
    return copyDeclaration;
  }

  changeNameOfDeclaration(){
    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      
      if(item instanceof Declaration){
        for(var j = 0; j < item.ids.length;j++){
          item.ids[j] = `${this.identifier}_${item.ids[j]}`;
        }
      }
    }
  }

  changeNameOfNestedFunction(){
    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      if (item instanceof Function) {
        item.identifier = `${this.identifier}_${item.identifier}`;
      }
    }
  }

  getCodeOfDeclaration(){
    var codeDeclaration = "";

    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      
      if(item instanceof Declaration){
        codeDeclaration += item.getTranslated();
      }
    }
    return codeDeclaration;
  }

  getCodeOfNestedFunction(){
    var code = "";
    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      if (item instanceof Function) {
        code += item.getTranslated();
      }
    }
    return code;
  }

  getCodeOfParams(){
    var item
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

  addParamsInNestedFunction(){
    var declarationInFunction = [];//lista de parametros
    
    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;

      if (item instanceof Declaration) {
        for(var j = 0; j < item.ids.length; j++){
          declarationInFunction.push(
            new Parameter(
              item.linea,
              item.column,
              item.ids[j],
              item.type,
              null)
          );
        }
      }
    }
    
    // parametros del padre
    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;

      if (item instanceof Function) {

        for(var j = 0; j < this.parameters.length; j++){
          item.parameters.push(this.parameters[j]);
        }

        for(var j = 0; j < declarationInFunction.length; j++){
          item.parameters.push(declarationInFunction[j]);
        }

      }
    }
  }

  addValuesForCallFunction(){
    
  }

  /**
   * obtengo el codigo para agregar al grafo del ast
   */
  getGraphsCode() {
    return "";
  }

  /**
   *
   * @param {Environment actual} e
   */
  translatedSymbolsTable(e) {
    TableReport.addTranslated(
      new nodeTableSymbols(
        this.line,
        this.column,
        this.identifier,
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
    throw new Error("Method not implemented.");
  }
}
