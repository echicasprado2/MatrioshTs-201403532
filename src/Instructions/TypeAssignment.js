class TypeAssignment extends Instruction {

    constructor(linea,column,identify,attributes){
        super(linea,column);

        this.identify = identify;
        this.attributes = attributes;

        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.identify}:{`;

        for(var i =0;i < this.attributes.length;i++){
            if(i == (this.attributes.length - 1)){
                this.translatedCode += `${this.attributes[i].getTranslated()}`;
            }else{
                this.translatedCode += `${this.attributes[i].getTranslated()},`;
            }
        }

        return `${this.translatedCode}}`;
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

    execute(e) {
        throw new Error("Method not implemented.");
    }

}