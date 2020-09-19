class AssignmentType extends Instruction {

    constructor(line,column,access,values){
        super(line,column);

        this.access = access;
        this.values = values;

        this.translatedCode = "";
    }

    getTranslated(){
        
        for(var i = 0; i < this.access.length; i++){
            this.translatedCode += (i == 0)? this.access[i].getTranslated() : `.${this.access[i].getTranslated()}`; 
        }

        this.translatedCode += " = {\n";
        for(var i = 0; i < this.values.length;i++){
            if(i == (this.values.length - 1)){
                this.translatedCode += `${this.values[i].getTranslated()}\n`
            }else{
                this.translatedCode += `${this.values[i].getTranslated()},\n`
            }
        }

        return `${this.translatedCode}};\n`;
        return this.translatedCode;
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        throw new Error("Method not implemented.");
    }

}