class DeclarationTypes extends Instruction {
    
    constructor(linea,column, typeDeclaration, ids, type, value){
        super(linea,column);

        this.typeDeclaration = typeDeclaration;
        this.ids  = ids;
        this.type = type;
        this.value = value;

        this.nodeName = TreeGraph.getNumberNode();
        // this.graphcsCode = TreeGraph;
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `${this.typeDeclaration.toString()} `;

        for(var i = 0; i < this.ids.length;i++){
            if(i == 0){
                this.translatedCode += this.ids[i];
            }else{
                this.translatedCode += ", " + this.ids[i];
            }
        }

        if(this.type.enumType != EnumType.NULL){
            this.translatedCode += ":" + this.type.toString();
        }

        this.translatedCode += " {";

        for(var i = 0; i < this.value.length;i++){
            if(i == (this.value.length - 1)){
                this.translatedCode += `${this.value[i].getTranslated()}`
            }else{
                this.translatedCode += `${this.value[i].getTranslated()},`
            }
        }

        return `${this.translatedCode}};\n`;
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