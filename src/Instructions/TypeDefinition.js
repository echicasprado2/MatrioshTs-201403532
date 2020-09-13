class TypeDefinition extends Instruction {
    
    constructor(linea,column,identify,declarations){
        super(linea,column);

        this.identify = identify;
        this.declarations = declarations;

        this.nodeName = TreeGraph.getNumberNode();
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `type ${this.identify} = {\n`;
        
        for(var i = 0;i < this.declarations.length;i++){
            if(i == (this.declarations.length - 1)){
                this.translatedCode += `${this.declarations[i].getTranslated()}\n`
            }else{
                this.translatedCode += `${this.declarations[i].getTranslated()};\n`
            }
            
        }
        
        return `${this.translatedCode}};\n\n`;
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