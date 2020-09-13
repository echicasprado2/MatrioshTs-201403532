class Arithmetic extends Expresion {

  /**
   * 
   * @param {*} linea 
   * @param {*} column 
   * @param {*} operationType 
   * @param {*} expresion1 
   * @param {*} expresion2 
   */
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
