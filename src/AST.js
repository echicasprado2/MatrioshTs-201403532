const { Environment } = require("./Structure/Symbols/Environment");

class AST {

    constructor(instruccions) {
        this.Instruccions = instruccions;
        this.graphCode = "";
        this.translatedCode = "";
        this.environmentTranslated = new Environment(null, new EnvironmentType(EnumEnvironmentType.GLOBAL));
        this.environmentExecute = new Environment(null, new EnvironmentType(EnumEnvironmentType.GLOBAL));
    }

    // TODO de este tengo que hacer la traduccion y tabla de simbolos de la traduccion
    getTranslatedCode(){
        for(var i = 0; i < this.Instruccions.length;i++){
            var item = this.Instruccions[i];
            this.translatedCode += item.translatedCode;
        }
    }

    getSimbolsTable(){

    }

    getGraphCode(){
        this.graphCode = "root((root));\n";

        for(var i = 0; i < this.Instruccions.length;i++){
            var item = this.Instruccions[i];
            this.graphCode += item.graphcsCode;
        }

        for(var i = 0; i < this.Instruccions.length;i++){
            var item = this.Instruccions[i];
            this.graphCode += item.nodeName + ";\n";
        }

        for(var i = 0; i < this.Instruccions.length;i++){
            var item = this.Instruccions[i];
            this.graphCode += "root --> " + item.nodeName + ";\n";
        }
        return this.graphCode;
    }

}
