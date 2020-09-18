class ArrayFunction extends Expresion {
  /**
   *
   * @param {*} linea
   * @param {*} column
   * @param {*} type
   * @param {*} identify
   * @param {*} value
   */
  constructor(linea, column, type, identify, value) {
    super(linea, column, null, null);
    this.identify = identify;
    this.type = type;
    this.value = value;
  }

  getTranslated() {
    if (this.type.enumType == EnumTypeArrayMethod.PUSH) {
      this.translatedCode += `${this.identify.getTranslated()}.${this.type.toString()}(${this.value.getTranslated()})`;
    } else if(this.type.enumType == EnumTypeArrayMethod.POP) {
      this.translatedCode += `${this.identify.getTranslated()}.${this.type.toString()}()`;
    }else{
      this.translatedCode += `${this.identify.getTranslated()}.${this.type.toString()}`;
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
