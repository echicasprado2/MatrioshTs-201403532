class InstructionError extends Instruction {

    constructor(){
        super(0,0);
    }

    getTranslated(){
        return "";
    }

    getGraphsCode(){
        return this.graphcsCode;
    }

    translatedSymbolsTable(e){
        return "";
    }

    executeSymbolsTable(e){
        return "";
    }

    execute(e) {
        return null;
    }

}