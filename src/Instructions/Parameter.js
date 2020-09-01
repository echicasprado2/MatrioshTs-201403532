class Parameter extends Instruction{

    constructor(line,column,identifier,type,expresion){
        super(line,column);
        this.identifier = identifier;
        this.type = type
        this.nodeName = TreeGraph.getNumberNode();

        var identifierNode = new Value(new Type(EnumType.STRING,""),this.identifier);
        var chieldren = [identifierNode,this.type];

        // TODO validar si se pueden hacer varias declaraciones de una vez
        if(expresion != null){
            this.expresion = expresion;
            chieldren.push(this.expresion);    
            this.translatedCode = this.identifier + " : " + this.type.toString() + " = " + this.expresion.value;
        }else{
            this.translatedCode = this.identifier + " : " + this.type.toString();
        }
        
        this.graphcsCode = TreeGraph.generateChieldren(this,'PARAMETER',chieldren);
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
        return "implementar este codigo";
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