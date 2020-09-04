class Block extends Instruction {
  constructor(sentences) {
    super(0, 0);
    this.nodeName = TreeGraph.getNumberNode();
    this.graphcsCode = TreeGraph.generateChieldren(this, "BLOCK", sentences);
    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode = "{";

    for(var i = 0;i < sentences.length;i++){
        this.translatedCode += sentences[i].getTranslated();
    }

    this.translatedCode = "}"
    return this.translatedCode;
  }

  getGraphsCode() {
    return this.graphcsCode;
  }

  translatedSymbolsTable(e) {
    for (var i = 0; i < this.sentences.length; i++) {
        this.sentences[i].translatedSymbolsTable(e);
    }
  }

  executeSymbolsTable(e) {
    return "implementar";
  }

  execute(e) {
    throw new Error("Method not implemented.");
  }
}
