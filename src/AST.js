class AST {

    constructor(instruccions) {
        this.instruccions = instruccions;
        this.graphCode = "";
        this.translatedCode = "";
        this.environmentTranslated = new Environment(null, new EnvironmentType(EnumEnvironmentType.GLOBAL));
        this.environmentExecute = new Environment(null, new EnvironmentType(EnumEnvironmentType.GLOBAL));
    }

    // TODO de este tengo que hacer la traduccion y tabla de simbolos de la traduccion
    getTranslatedCode(){
        for(var i = 0; i < this.instruccions.length;i++){
            var item = this.instruccions[i];
            this.translatedCode += item.translatedCode;
        }
    }

    getSymbolsTable(){//e es environment translated
        for(var i = 0;i < this.instruccions.length;i++){
            var item = this.instruccions[i];
            console.log();
            item.getSymbolsTable(this.environmentTranslated);
        }
    }

    getGraphCode(){
        this.graphCode = "root((root));\n";

        for(var i = 0; i < this.instruccions.length;i++){
            var item = this.instruccions[i];
            this.graphCode += item.graphcsCode;
        }

        for(var i = 0; i < this.instruccions.length;i++){
            var item = this.instruccions[i];
            this.graphCode += item.nodeName + ";\n";
        }

        for(var i = 0; i < this.instruccions.length;i++){
            var item = this.instruccions[i];
            this.graphCode += "root --> " + item.nodeName + ";\n";
        }
        return this.graphCode;
    }

}
