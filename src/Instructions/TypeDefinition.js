class TypeDefinition extends Instruction {
    
    constructor(linea,column,identify,declarations){
        super(linea,column);

        this.identify = identify;
        this.declarations = declarations;

        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode += `type ${this.identify} = {\n`;
        
        for(var i = 0;i < this.declarations.length;i++){
            if(i == (this.declarations.length - 1)){
                this.translatedCode += `${this.declarations[i].getTranslated()}\n`
            }else{
                this.translatedCode += `${this.declarations[i].getTranslated()};\n`
            }
            
        }
        
        return `${this.translatedCode}};\n\n`;
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.line,
              this.column,
              this.identify,
              null,
              e.enviromentType,
              null
            )
        );
        
        var envTypeDefinition = new Environment(e,new EnvironmentType(EnumEnvironmentType.TYPE, this.identify));
        for(var i = 0; i < this.declarations.length; i++){
          this.declarations[i].translatedSymbolsTable(envTypeDefinition);
        }
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        var exists = e.searchSymbol(this.identify);
        
        if(exists === null){
            e.insert(this.identify,new Symbol(this.identify,new Type(EnumType.TYPE),new DeclarationType(EnumDeclarationType.NULL),this));
            TableReport.addExecute(new NodeTableSymbols(this.line,this.column,this.identify,e.enviromentType,null));
        }else{
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El type: "${this.identify}" ya se encuentra definido`,e.enviromentType));
        }

        return null;
    }

}