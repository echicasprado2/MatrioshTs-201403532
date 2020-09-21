class AST {

  constructor(instruccions) {
    this.instruccions = instruccions;
    this.graphCode = "";
    this.translatedCode = "";
    this.environmentTranslated = new Environment(null,new EnvironmentType(EnumEnvironmentType.GLOBAL, null));
    this.environmentExecute = new Environment(null,new EnvironmentType(EnumEnvironmentType.GLOBAL, null));
  }

  /**
   * obtengo el codigo traduccido de mi analisis
   */
  getTranslated() {
    // ErrorList.cleanErrorList();
    PrintConsole.cleanConsole();

    for (var i = 0; i < this.instruccions.length; i++) {
      this.translatedCode += this.instruccions[i].getTranslated();
    }

    ErrorList.showErrors();
    PrintConsole.printLine("fin traduccion");
    return this.translatedCode;
  }

  /**
   * creo la tabla de simbolos para la traduccion
   */
  translatedSymbolsTable() {
    TableReport.cleanTranslated();
    for (var i = 0; i < this.instruccions.length; i++) {
      this.instruccions[i].translatedSymbolsTable(this.environmentTranslated);
    }
  }

  /**
   * Obtengo la tabla de simbolos para la ejecucion
   */
  executeSymbolsTable() {}
  
  execute(){
    TableReport.cleanExecute();
    PrintConsole.cleanConsole();

    for(var i = 0; i < this.instruccions.length;i++){
      if(this.instruccions[i] instanceof TypeDefinition){
        (this.instruccions[i]).execute(this.environmentExecute);
      }
    }

    for(var i = 0; i < this.instruccions.length; i++){
      if(this.instruccions[i] instanceof Function){
        (this.instruccions[i]).execute(this.environmentExecute);
      }
    }

    for(var i = 0; i < this.instruccions.length; i++){
      if(this.instruccions[i] instanceof Declaration || this.instruccions[i] instanceof DeclarationArray || this.instruccions[i] instanceof DeclarationTypes){
        (this.instruccions[i]).execute(this.environmentExecute);
      }
    }

    for(var i = 0; i < this.instruccions.length; i++){
      if(!(this.instruccions[i] instanceof TypeDefinition) &&
       !(this.instruccions[i] instanceof Function) && 
       !(this.instruccions[i] instanceof Declaration) && 
       !(this.instruccions[i] instanceof DeclarationTypes) &&
       !(this.instruccions[i] instanceof DeclarationArray)){
            if(this.instruccions[i] instanceof Instruction){
              (this.instruccions[i]).execute(this.environmentExecute);
            }else if(this.instruccions[i] instanceof Expresion){
              //TODO implement called getValue
            }
          }
    }

    ErrorList.showErrors();
    PrintConsole.printLine("fin ejecucion");
    return null;
  }

}
