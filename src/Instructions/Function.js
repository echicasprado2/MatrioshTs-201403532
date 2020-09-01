class Function extends Instruction{
    /**
     * 
     * @param {*} line 
     * @param {*} column 
     * @param {*} identifier 
     * @param {*} Parameters 
     * @param {*} type 
     */
    constructor(line,column,identifier,Parameters,type){
        super(line,column);
        this.identifier = identifier;
        this.parameters = Parameters;
        this.instructions = [] //array de instrucciones
        this.type = type;
        this.nodeName = TreeGraph.getNumberNode();;
        this.graphcsCode = "";
        this.translatedCode = "";
        this.nestedFunctions = [];
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
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
        return this.translatedCode;
    }

    /**
     * obtengo el codigo para agregar al grafo del ast
     */
    getGraphsCode(){
        var chieldren =[];
         
        for(var i = 0;i < this.instructions.length;i++){
            chieldren.push(this.instructions[i]);
        }

        for(var i = 0;i < this.nestedFunctions.length;i++){
            chieldren.push(this.nestedFunctions[i]);
        }
        
        this.graphcsCode = TreeGraph.generateChieldren(this,this.identifier,chieldren);
        
        return this.graphcsCode;
    }

    /**
     * 
     * @param {Environment actual} e  
     */
    translatedSymbolsTable(e){
        // var exists = e.searchSymbol(this.identifier);

        // if(exists == null){// no existe la funcion
        //     //e.insert(this.identifier,new Symbol(this.identifier,new Type(EnumType.FUNCTION,""),this));
        //     TableReport.addTranslated(new nodeTableSymbols(this.line,this.column,this.identifier,e.enviromentType.toString(),null));
        //     var enviromentFunction = new Enviroment(e,new enviromentType(EnumEnvironmentType.FUNCTION,this.identifier));
        //     for(var i = 0;i< this.i)
        // }else{
        //     console.log(
        //         new ErrorNode(
        //             this.line,
        //             this.column,
        //             new ErrorType(EnumErrorType.SEMANTIC),
        //             `La funcion ${this.identifier} ya existe en la linea: ${this.line}, columna: ${this.column}`),
        //             e.type
        //             );
        // }

        TableReport.addTranslated(new nodeTableSymbols(this.line,this.column,this.identifier,e.enviromentType,null));
        var envFunction = new Environment(e,new EnvironmentType(EnumEnvironmentType.FUNCTION,this.identifier));
        console.log(envFunction);
        
        for(var i = 0;i < this.instructions.length;i++){
            this.instructions[i].translatedSymbolsTable(envFunction);
        }

        for(var i = 0;i < this.nestedFunctions.length;i++){
            this.nestedFunctions[i].translatedSymbolsTable(envFunction);
        }
    }

    /**
     * 
     * @param {Enviroment} e 
     */
    executeSymbolsTable(e){
        return "implementar este codigo"
    }

    /**
     * 
     * @param {Environment} e 
     */
    execute(e) {
        throw new Error("Method not implemented.");
    }

}