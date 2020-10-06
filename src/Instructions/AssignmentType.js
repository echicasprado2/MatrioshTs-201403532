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
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        //TODO implemented this
        let resultSymbol;
        let newValue;
        let definition;
        let symbolTypeDefinition;
        let valueMap;
        let lengthProp;
        let tmp;

        resultSymbol = e.searchSymbol(this.access[0].identifier);

        if(resultSymbol == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMATIC),`No se encontro la variable`,e.enviromentType));
            return null;
        }

        if(resultSymbol.typeDeclaration.enumType == EnumDeclarationType.CONST){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable de tipo CONST, no se puede cambiar el valor`,e.enviromentType));
            return null;
        }
        
        if(resultSymbol.type.enumType != EnumType.TYPE){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable no es de tipo type`,e.enviromentType));
            return null;
        }

        symbolTypeDefinition = e.searchSymbol(resultSymbol.type.identifier);
        
        if(symbolTypeDefinition == null){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMATIC),`No encontro la definicion de type`,e.enviromentType));
            return null;
        }

        lengthProp = symbolTypeDefinition.value.declarations.length;

        if(lengthProp != this.values.length){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Numero de valores no es igual al numero de propiedades`,e.enviromentType));
            return null;
        }

        valueMap = new Map();

        for(var i = 0; i < lengthProp; i++){
            definition = symbolTypeDefinition.value.declarations[i];
            newValue = this.values[i].execute(e);

            if(definition.identify != newValue.identify){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El nombre de la la propiedad no coincide con la del type`,e.enviromentType));
                return null;
            }

            tmp = newValue.value;

            if(tmp.type.enumType != EnumType.NULL){
                
                if(definition.type.enum == EnumType.TYPE){
                    if(definition.type.identify != tmp.type.identify){
                        ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El valor no es del mismo tipo que la propiedad`,e.enviromentType));
                        return null;
                    }
                }

                if(definition.type.enumType != tmp.type.enumType){
                    ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`El valor no es del mismo tipo que la propiedad`,e.enviromentType));
                    return null;
                }

                valueMap.set(definition.identify,new Value(definition.type,tmp.value));
            }else{
                valueMap.set(definition.identify,new Value(definition.type,tmp.value));
            }
        }

        let insertSymbol = new Symbol(this.linek,this.column,this.access[0].identifier,resultSymbol.type,resultSymbol.typeDeclaration,new Value(resultSymbol.type,valueMap),0);
        e.insert(this.access[0].identifier,insertSymbol);

        return null;
    }

}