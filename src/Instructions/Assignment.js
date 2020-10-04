class Assignment extends Instruction {
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} access 
     * @param {*} expresion 
     */
    constructor(linea,column,access,expresion){
        super(access[0].line,access[0].column);
        this.access = access;
        this.value = expresion;
        this.translatedCode = "";
    }

    getTranslated(){
        for(var i = 0;i < this.access.length;i++){
            this.translatedCode += (i == 0) ? this.access[i].getTranslated() : "." + this.access[i].getTranslated(); 
        }
        
        this.translatedCode += " = ";
        
        if(this.value instanceof Array){
            this.translatedCode += this.makeArray(this.value)
        }else{
            this.translatedCode += this.value.getTranslated();
        }

        return this.translatedCode + ";\n";
    }

    makeArray(valueArray){
        var cadena = "[";

        if(valueArray != null){
            for(var i = 0;i< valueArray.length;i++){
                if(valueArray[i] instanceof Array){
                    cadena += `,${this.makeArray(valueArray[i])}`;
                }else if(i == 0){
                    cadena += valueArray[i].getTranslated();
                }else{
                    cadena += "," + valueArray[i].getTranslated();
                }
            }
        }
        
        return cadena + "]";
    }

    translatedSymbolsTable(e){
        return"implementar";
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        //TODO implementar para types
        if(this.value instanceof Array){
            this.executeArray(e);
        }else if(this.value instanceof Expresion){
            this.executePrimitive(e);
        }
        return null
    }

    executePrimitive(e){
        var resultSymbol = this.access[0].getValue(e);
        var resultExp = this.value.getValue(e);

        if(resultSymbol == null || resultSymbol.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable no esta definida`,e.enviromentType));
            return null;
        }
        
        if(resultSymbol.typeDeclaration.enumType == EnumDeclarationType.CONST){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable de tipo CONST, no se puede cambiar el valor`,e.enviromentType));
            return null;
        }

        if(resultExp.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor no se puede asignar`,e.enviromentType));
            return null;
        }

        if(resultSymbol.type.enumType == EnumType.TYPE){
            this.executeType(e,resultSymbol,resultExp);
            return null;
        }

        if(resultSymbol.type.enumType == EnumType.NULL){
            resultSymbol.type = resultExp.type;

        }else if(resultSymbol.type.enumType != resultExp.type.enumType){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el tipo de valor no coincide con el tipo de variable ${resultSymbol.type.toString()} != ${resultExp.type.toString()}`,e.enviromentType));
            return null;
        }
        
        if(resultSymbol.type.enumType == EnumType.ARRAY){
            if(resultSymbol.dimensions != this.getDimensionArray(resultExp.value,0)){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`dimensiones de los arreglos son diferentes`,e.enviromentType));
                return null;
            }
            e.insert(resultSymbol.id,new Symbol(this.line,this.column,resultSymbol.id,resultSymbol.type,resultSymbol.typeDeclaration,resultExp,resultSymbol.dimensions));
        }else{
            e.insert(resultSymbol.id,new Symbol(this.line,this.column,resultSymbol.id,resultSymbol.type,resultSymbol.typeDeclaration,resultExp,0));
        }

        return null;
    }

    executeArray(e){
        var resultSymbol;
        var resultExp;
        var valueDimensions;
        var newSymbol;

        resultSymbol = this.access[0].getValue(e);
        resultExp = this.getValueArray(e,this.value,resultSymbol.type.identifier,1,resultSymbol.dimensions,resultSymbol.type.identifier);
        valueDimensions = this.getNumberDimensionsArray(this.value,1);
        
        if(resultExp == null){
            return null;
        }
        
        if(resultSymbol == null || resultSymbol.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable no esta definida`,e.enviromentType));
            return null;
        }

        if(resultSymbol.typeDeclaration.enumType == EnumDeclarationType.CONST){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable de tipo CONST, no se puede cambiar el valor`,e.enviromentType));
            return null;
        }

        if(resultExp.type.enumType == EnumType.ERROR){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor no se puede asignar`,e.enviromentType));
            return null;
        }

        if(valueDimensions < resultSymbol.dimensions){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor es menor que el numero de dimenciones del array`,e.enviromentType));
            return null;
        }

        newSymbol = new Symbol(this.line,this.column,resultSymbol.id,resultSymbol.type,resultSymbol.typeDeclaration,resultExp,resultSymbol.dimensions);
        e.insert(resultSymbol.id,newSymbol);
        return null;
    }

    executeType(e,symbol,newValue){//TODO hacer asignacion de type
        let key;
        let tempValue;
        let tempMap;

        for(let i = 1; i < this.access.length; i++){
            key = this.access[i].identifier;

            if(symbol.value.value.has(key) && i == (this.access.length - 1) ){
                // tempMap = symbol.value.value.get(key);
                tempValue = symbol.value.value.get(key);

                if(tempValue instanceof Value){

                    if(tempValue.type.enumType != newValue.type.enumType){
                        ErrorList.addError(new ErrorNode(this.line,this.column, new ErrorType(EnumErrorType.SEMANTIC),"El valor no es del mismo tipo",e.enviromentType));
                        return null;
                    }

                    symbol.value.value.set(key,newValue);
                }

            }
        }
    }

    /**
     * @param {[Value...]} el valor del simbolo
     * @returns {number} el numero de dimensiones que tiene el array en la tabla de simbolos
     */
    getNumberDimensionsArray(valueArray,dimencion){
        for(var i = 0;i < valueArray.length; i++){
            if(valueArray[i] instanceof Array){
                return this.getNumberDimensionsArray(valueArray[i],dimencion+1);
            }
        }
        return dimencion;
    }

    getValueArray(e,objArray,type,currentDimension,symbolDimension){
        var listValueReturn = [];
        var resultValue;

        if(objArray[0] instanceof Value && objArray[0].type.enumType == EnumType.NULL){
            return objArray[0];
        }
        
        if(currentDimension > symbolDimension){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor supera el numero de dimenciones del array`,e.enviromentType));
            return null;
        }

        for(var i = 0; i < objArray.length; i++){
        
            if(objArray[i] instanceof Array){
                resultValue = this.getValueArray(e,objArray[i],type,currentDimension + 1,symbolDimension);
            }else{
                resultValue = (objArray[i]).getValue(e);
            }

            if(resultValue == null){
                return null;
            }

            if(resultValue.type.enumType == EnumType.ERROR){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor da error`,e.enviromentType));
                return null;
            }

            if(type == EnumType.NULL){
                type = resultValue.type;

                if(resultValue.value instanceof Array){
                    listValueReturn.push(resultValue.value);
                }else{
                    listValueReturn.push(resultValue);
                }
                
            }else if(type == resultValue.type.enumType){
                if(resultValue.value instanceof Array){
                    listValueReturn.push(resultValue.value);
                }else{
                    listValueReturn.push(resultValue);
                }

            }else if(type != resultValue.type.enumType){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el tipo de valor no coincide con el tipo del array`,e.enviromentType));
                return null;
            }

         }

        return new Value(new Type(type,null),listValueReturn);
    }

    getDimensionArray(array,dimension){
        if(array instanceof Array){
            return this.getDimensionArray(array[0], dimension + 1);
        }
        return dimension;
    }

}