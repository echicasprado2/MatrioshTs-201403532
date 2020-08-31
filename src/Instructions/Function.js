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

    getSymbolsTable(e){//e es environment translated
        console.log(e);
        var exists = e.searchSymbol(this.identifier);

        if(exists == null){// no existe la funcion
            e.insert(this.identifier,new Symbol(this.identifier,new Type(EnumType.FUNCTION,""),this));
            TranslatedTableSymbols.add(new nodeTableSymbols(this.line,this.column,this.identifier,e.enviromentType.toString()));
        }else{
            console.log(
                new ErrorNode(
                    this.line,
                    this.column,
                    new ErrorType(EnumErrorType.SEMANTIC),
                    `La funcion ${this.identifier} ya existe en la linea: ${this.line}, columna: ${this.column}`),
                    e.type
                    );
        }
        return null;
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }
}