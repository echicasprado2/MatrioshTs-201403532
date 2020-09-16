class Parameter extends Instruction{

    constructor(line,column,identifier,type,expresion){
        super(line,column);
        this.identifier = identifier;
        this.type = type;
        this.expresion = expresion;
        this.nodeName = TreeGraph.getNumberNode();
    }

    /**
     * obtener el codigo para la traduccion
     */
    getTranslated(){
        this.translatedCode = "";
        this.translatedCode += this.identifier;
        
        if(this.type.enumType != EnumType.NULL){
            this.translatedCode += `:${this.type.toString()}`;
        }

        if(this.expresion != null){
            this.translatedCode += ` = ${this.expresion.getTranslated()}`;
        }

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