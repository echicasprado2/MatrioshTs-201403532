class Function extends Instruction{
    constructor(line,column,identifier,Parameters,type){
        super(line,column);
        this.identifier = identifier;
        this.parameters = Parameters;
        this.instructions = [] //array de instrucciones
        this.type = type;
        this.nodeName = "";
        this.graphcsCode = "";
        this.translatedCode = "";
        this.nestedFunctions = [];
    }

    getTranslated(){
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph.generateChieldren(this,this.identifier,this.Instructions);

        this.translatedCode = `function ${this.identifier}(`;

        for(var i=0;i<this.Parameters.length;i++){
            var item = this.Parameters[i];
            this.translatedCode += item.translatedCode
            if(!(i == (this.Parameters.length-1))){
                this.translatedCode += ",";
            }
        }

        this.translatedCode += "){\n";

        for(var i=0;i<this.Instructions.length;i++){
            var item = this.Instructions[i];
            this.translatedCode += item.translatedCode + ";\n";
        }

        this.translatedCode += "}";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }
}