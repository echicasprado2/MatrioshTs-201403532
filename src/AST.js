class AST {

    constructor(instruccions) {
        this.Instruccions = instruccions;
        this.graphCode = "";
    }

    getGraphCode(){
        this.graphCode = "root((root));\n";
        for(var i = 0; i < this.Instruccions.length;i++){
            var item = this.Instruccions[i];
            this.graphCode += "root --> " + item.graphcsCode;
        }
        return this.graphCode;
    }

}
