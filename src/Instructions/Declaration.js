class Declaration extends Instruction {
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} typeDeclaration 
     * @param {*} ids 
     * @param {*} type 
     */
    constructor(linea, column, typeDeclaration, ids, type, value){
        super(linea,column);
        
        this.typeDeclaration = typeDeclaration;
        this.ids  = ids;
        this.type = type;
        this.value = value;
        
        this.nodeName = TreeGraph.getNumberNode();
        //this.graphcsCode = TreeGraph.getCodeOfDeclaration(this,this.typeDeclaration,this.ids,this.type,this.value);
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += this.typeDeclaration.toString() + " ";
        
        for(var i = 0; i < this.ids.length;i++){
            if(i == 0){
                this.translatedCode += this.ids[i];
            }else{
                this.translatedCode += ", " + this.ids[i];
            }
        }

        if(this.type.enumType != EnumType.NULL){
            this.translatedCode += ":" + this.type.toString();
        }else{
            this.translatedCode;
        }

        if(this.value != ""){
            if(this.value instanceof Array){
                for(var i =0;i< this.value.length;i++){
                    if(i == 0){
                        this.translatedCode += " = " + this.value[i].getTranslated();
                    }else{
                        this.translatedCode += "." + this.value[i].getTranslated();
                    }
                }
            }else{
                this.translatedCode += " = " + this.value.getTranslated();
            }
        }
        return this.translatedCode + ";\n";
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