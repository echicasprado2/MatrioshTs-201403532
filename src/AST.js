class AST {

    constructor(instruccions) {
        this.Instruccions = instruccions;
        this.graphCode = "";
        this.translatedCode = "";

        for(var i = 0; i < this.Instruccions.length;i++){
            var item = this.Instruccions[i];
            this.translatedCode += item.translatedCode;
        }
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
