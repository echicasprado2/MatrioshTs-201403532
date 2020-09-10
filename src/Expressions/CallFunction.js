class CallFunction extends Expresion {

    constructor(linea,column,identifier,parametros){
        super(linea,column,null,null);
        this.nodeName = TreeGraph.getNumberNode();
        this.identifier = identifier;
        this.value = parametros;
        this.graphcsCode = "";
        this.translatedCode = "";
    }

    getTranslated(){
        //FIXME test use access and expresion 
        this.translatedCode += `${this.identifier}(`

        for(var i = 0;i < this.value.length;i++){
            this.translatedCode += (i == 0) ? this.value[i].getTranslated() : `, ${this.value[i].getTranslated()}`; 
        }
        this.translatedCode += ")";

        if(this.parentesis){
            return `(${this.translatedCode})`;
        }else{
            return this.translatedCode;
        }
    }

    getGraphsCode(){
        return this.graphcsCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    getValue(e) {
        throw new Error("Method not implemented.");
    }

}