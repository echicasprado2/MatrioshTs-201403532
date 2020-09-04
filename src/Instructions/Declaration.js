class Declaration extends Instruction {
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} typeDeclaration 
     * @param {*} ids 
     * @param {*} type 
     */
    constructor(linea, column, typeDeclaration, ids, type){
        super(linea,column);
        this.typeDeclaration = typeDeclaration;
        this.ids  = ids;
        this.type = type;
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph.getCodeOfDeclaration(this,this.typeDeclaration,ids,type);
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += this.typeDeclaration.toString() + " ";
        
        for(var i = 0; i < this.ids.length;i++){
            if(i == (this.ids.length - 1) || i == 0){
                this.translatedCode += this.ids[i];
            }else{
                this.translatedCode += ", " + this.ids[i];
            }
        }

        if(this.type.enumType != EnumType.NULL){
            this.translatedCode += ":" + this.type.toString() + ";\n";
        }else{
            this.translatedCode += ";\n";
        }
        
        return this.translatedCode;
    }

    getGraphsCode(){
        return this.graphcsCode;
    }

    translatedSymbolsTable(e){
        for(var i=0;i < this.ids.length;i++){
            TableReport.addTranslated(
                new nodeTableSymbols(
                  this.line,
                  this.column,
                  this.ids[i],
                  e.enviromentType,
                  null
                )
            );
        }
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}