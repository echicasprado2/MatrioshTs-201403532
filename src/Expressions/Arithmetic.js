class Arithmetic extends Expresion {
  constructor(linea, column, operationType, expresion1, expresion2) {
    super(linea, column);
    this.operationType = operationType;
    this.expresion1 = expresion1;
    this.expresion2 = expresion2;
    this.nodeName = TreeGraph.getNumberNode();

    this.graphcsCode = "";
    this.translatedCode = "";
  }

  /**
   * obtener el codigo para la traduccion
   */
  getTranslated() {
    for (var i = 0; i < this.expresion1.length; i++) {
        this.translatedCode += (i == 0) ? this.expresion1[i].getTranslated() : `.${this.expresion1[i].getTranslated()}`;
    }

    this.translatedCode += ` ${this.operationType.toString()} `;

    for (var i = 0; i < this.expresion2.length; i++) {
        this.translatedCode += (i == 0) ? this.expresion2[i].getTranslated() : `.${this.expresion2[i].getTranslated()}`;
    }

    return this.translatedCode;
  }

  /**
   * obtengo el codigo para agregar al grafo del ast
   */
  getGraphsCode() {
    return this.graphcsCode;
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
  executeSymbolsTable(e) {
    return "implementar este codigo";
  }
}
