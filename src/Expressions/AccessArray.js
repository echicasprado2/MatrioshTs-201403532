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

    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode = `${this.identifier}`;

    for (var i = 0; i < this.value.length; i++) {
        this.translatedCode += "[";
        this.translatedCode += this.value[i].getTranslated();
        this.translatedCode += "]";
    }

    if (this.parentesis) {
      return `(${this.translatedCode})`;
    } else {
      return this.translatedCode;
    }
  }

  translatedSymbolsTable(e) {
    return "implementar";
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  getValue(e) {
    //TODO implemented this
    throw new Error("Method not implemented.");
  }
}
