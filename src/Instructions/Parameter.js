class Parameter extends Instruction{

    constructor(line,column,identifier,type,expresion,isArray,dimentions){
        super(line,column);
        this.identifier = identifier;
        this.type = type;
        this.typeDeclaration = new DeclarationType(EnumDeclarationType.LET);
        this.expresion = expresion;
        this.isArray = isArray;
        this.dimensions = dimentions;
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

        if(this.isArray){
            for(var i = 0; i<this.dimensions;i++){
                this.translatedCode += "[]";
            }
        }

        if(this.expresion != null){
            this.translatedCode += ` = ${this.expresion.getTranslated()}`;
        }

        return this.translatedCode;
    }

    /**
     * 
     * @param {Environment actual} e  
     */
    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.line,
              this.column,
              this.identifier,
              this.type,
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
        if(this.dimensions != 0){
            this.type.identifier = this.type.enumType;
            this.type.enumType = EnumType.ARRAY;
        }
    }

}