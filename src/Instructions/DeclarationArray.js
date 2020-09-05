class DeclarationArray extends Instruction {
    constructor(linea,column,typeDeclaration,ids,type,dimensions,value){
        super(linea,column);
        this.typeDeclaration = typeDeclaration;
        this.ids = ids;
        this.type = type;
        this.dimensions = dimensions;
        this.values = value;
        this.nodeName = TreeGraph.getNumberNode();
        this.graphcsCode = TreeGraph.getCodeOfDeclarationArray(this,this.typeDeclaration,this.ids,this.type,this.dimensions,this.values);
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

        for(var i = 0; i<this.dimensions;i++){
            this.translatedCode += "[]";
        }

        if(this.values != ""){
            this.translatedCode += " = [";
            for(var i = 0;i< this.values.value[0].length;i++){
                if(i == 0){
                    this.translatedCode += this.values.value[0][i].getTranslated();
                }else{
                    this.translatedCode += "," + this.values.value[0][i].getTranslated();
                }
            }
            this.translatedCode += "]";
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