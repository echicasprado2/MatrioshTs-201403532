class AccessArray extends Expresion {
  /**
   *
   * @param {*} linea
   * @param {*} column
   */
  constructor(linea, column, id, expresion) {
    super(linea, column, null, null);

    this.identifier = id;
    this.value = expresion;

    this.nodeName = TreeGraph.getNumberNode();
    this.graphcsCode = TreeGraph;
    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode = `${this.identifier}`;

    for (var i = 0; i < this.value.length; i++) {
      if (this.value[i] instanceof Array) {
        this.translatedCode += "[";
        for (var j = 0; j < this.value[i].length; j++) {
          if (j == 0) {
            this.translatedCode += this.value[i][j].getTranslated();
          } else {
            this.translatedCode += "." + this.value[i][j].getTranslated();
          }
        }
        this.translatedCode += "]";
      } else {
        this.translatedCode += `[${this.value[i].getTranslated()}]`;
      }
    }

    if (this.parentesis) {
      return `(${this.translatedCode})`;
    } else {
      return this.translatedCode;
    }
  }

  getGraphsCode() {
    return this.graphcsCode;
  }

  translatedSymbolsTable(e) {
    return "implementar";
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  getValue(e) {
    throw new Error("Method not implemented.");
  }
}
