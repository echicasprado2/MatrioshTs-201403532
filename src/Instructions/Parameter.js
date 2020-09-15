class Parameter extends Instruction{

    constructor(line,column,identifier,type,expresion){
        super(line,column);
        this.identifier = identifier;
        this.type = type
        this.nodeName = TreeGraph.getNumberNode();

        var identifierNode = new Value(new Type(EnumType.STRING,""),this.identifier);
        var chieldren = [identifierNode,this.type];

        if(expresion != null){
            this.expresion = expresion;
            chieldren.push(this.expresion);    
            this.translatedCode = this.identifier + " : " + this.type.toString() + " = " + this.expresion.value;
        }else{
            this.translatedCode = this.identifier + " : " + this.type.toString();
        }
        
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
        return this.translatedCode;
    }

    /**
     * obtengo el codigo para agregar al grafo del ast
     */
    getGraphsCode(){
        return this.graphcsCode;
    }

    /**
     * 
     * @param {Environment actual} e  
     */
    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new nodeTableSymbols(
              this.line,
              this.column,
              this.identifier,
              e.enviromentType,
              null
            )
        );
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
     * @param {*} e 
     */
    execute(e) {
        throw new Error("Method not implemented.");
    }

}