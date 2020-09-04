class AST {
  constructor(instruccions) {
    this.instruccions = instruccions;
    this.graphCode = "";
    this.translatedCode = "";
    this.environmentTranslated = new Environment(
      null,
      new EnvironmentType(EnumEnvironmentType.GLOBAL, "")
    );
    this.environmentExecute = new Environment(
      null,
      new EnvironmentType(EnumEnvironmentType.GLOBAL, "")
    );
  }

  /**
   * obtengo el codigo traduccido de mi analisis
   */
  getTranslated() {
    // TODO de este tengo que hacer la traduccion
    for (var i = 0; i < this.instruccions.length; i++) {
      this.translatedCode += this.instruccions[i].getTranslated();
    }
    return this.translatedCode;
  }

  /**
   * creo el codigo para generar el ast,
   */
  getGraphCode() {
    this.graphCode = "root((root));\n";

    for (var i = 0; i < this.instruccions.length; i++) {
      this.graphCode += this.instruccions[i].getGraphsCode();
    }

    for (var i = 0; i < this.instruccions.length; i++) {
      this.graphCode += this.instruccions[i].nodeName + ";\n";
    }

    for (var i = 0; i < this.instruccions.length; i++) {
      this.graphCode += "root --> " + this.instruccions[i].nodeName + ";\n";
    }
    return this.graphCode;
  }

  /**
   * creo la tabla de simbolos para la traduccion
   */
  translatedSymbolsTable() {
    //e es environment translated
    TableReport.cleanTranslated();
    for (var i = 0; i < this.instruccions.length; i++) {
      this.instruccions[i].translatedSymbolsTable(this.environmentTranslated);
    }
  }

  /**
   * Obtengo la tabla de simbolos para la ejecucion
   */
  executeSymbolsTable() {}
}
