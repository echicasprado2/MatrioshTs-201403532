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
    this.nodeName = TreeGraph.getNumberNode();
    this.graphcsCode = "";
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
    var codeNestedFunction = "";
    this.translatedCode = `function ${this.identifier}(`;

    for (var i = 0; i < this.parameters.length; i++) {
      var item = this.parameters[i];
      this.translatedCode += item.translatedCode;
      if (!(i == this.parameters.length - 1)) {
        this.translatedCode += ",";
      }
    }

    this.translatedCode += `):${this.type.toString()}{\n`;

    for (var i = 0; i < this.chieldren.length; i++) {
      var item = this.chieldren[i].instruction;
      if (item instanceof Function) {
        item.identifier = `${this.identifier}_${item.identifier}`;
        codeNestedFunction += item.getTranslated();
      } else {
        this.translatedCode += item.getTranslated();
      }
    }
    this.translatedCode += "}\n";
    this.translatedCode += codeNestedFunction;
    return this.translatedCode;
  }

  /**
   * obtengo el codigo para agregar al grafo del ast
   */
  getGraphsCode() {
    /* FIXME necesito que la grafica se vea que va a la derecha
    * puedo crear un metodo especial para graficar las funciones,
    * le puedo pasar el objeto como tal y que me retorne su grafica.
    */
    var chieldrenGraph = [];
    for (var i = 0; i < this.chieldren.length; i++) {
      chieldrenGraph.push(this.chieldren[i].instruction);
    }

    this.graphcsCode = TreeGraph.generateChieldren(
      this,
      `function ${this.identifier}`,
      chieldrenGraph
    );

    return this.graphcsCode;
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
    var envFunction = new Environment(
      e,
      new EnvironmentType(EnumEnvironmentType.FUNCTION, this.identifier)
    );

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
