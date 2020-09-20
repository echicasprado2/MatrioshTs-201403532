class Block extends Instruction {
  
  /**
   * 
   * @param {*} sentences 
   */
  constructor(sentences) {
    super(0, 0);

    this.sentences = sentences;
    this.translatedCode = "";
  }

  getTranslated() {
    this.translatedCode = "{\n";

    for(var i = 0;i < this.sentences.length;i++){
        this.translatedCode += `\t${this.sentences[i].getTranslated()}`;
    }

    this.translatedCode += "}"
    return this.translatedCode;
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
    //TODO implemented this
    throw new Error("Method not implemented.");
  }
}