class DeclarationArray extends Instruction {
    constructor(linea,column,typeDeclaration,ids,type,dimensions,value){
        super(linea,column);
        this.typeDeclaration = typeDeclaration;
        this.ids = ids;
        this.type = type;
        this.dimensions = dimensions;
        this.values = value;
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
            this.translatedCode += " = ";
            this.translatedCode += this.makeArray(this.values.value[0]);
        }

        return this.translatedCode + ";\n";
    }

    makeArray(valueArray){
        var cadena = "[";

        if(this.values != null){
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
        for(var i=0;i < this.ids.length;i++){
            TableReport.addTranslated(
                new NodeTableSymbols(
                  this.line,
                  this.column,
                  this.ids[i],
                  this.type,
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
        var listValues = [];
        var saveValue;

        if (this.typeDeclaration.enumType == EnumDeclarationType.CONST) {
          if (this.values == null) {
            for (var i = 0; i < this.ids.length; i++) {
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La constante: "${this.ids[i]}" no tiene asignacion de un valor, debe tener valor`,e.enviromentType));
            }
            return null;
          }
        }
        
        listValues = this.getValueArray(e,this.values.value[0],this.type,1);
        
        if(listValues == null){
            return null;
        }

        for(var i =0;i < this.ids.length;i++){
            saveValue = new Symbol(this.line,this.column,this.ids[i],new Type(EnumType.ARRAY,listValues.type.enumType),this.typeDeclaration,listValues);
            e.insert(this.ids[i],saveValue);
        }

        return null;
    }

    /**
     * debe retornar un value con un array de value
     * 
     * @param {*} e 
     * @param {*} objArray 
     * @param {*} typeObj 
     * @returns {Value} Value
     */
    getValueArray(e,objArray,type,dimension){
        var listValueReturn = [];
        var resultValue;

        if(objArray[0].type.enumType == EnumType.NULL){
            return objArray[0];
        }
        
        if(dimension > this.dimensions){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el valor supera el numero de dimenciones del array`,e.enviromentType));
            return null;
        }

        for(var i = 0; i < objArray.length; i++){
        
            if(objArray[i] instanceof Array){
                resultValue = this.getValueArray(e,objArray[i],type,dimension + 1);
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

            if(type.enumType == EnumType.NULL){
                type = resultValue.type;

                if(resultValue.value instanceof Array){
                    listValueReturn.push(resultValue.value);
                }else{
                    listValueReturn.push(resultValue);
                }
                
            }else if(type.enumType == resultValue.type.enumType){
                if(resultValue.value instanceof Array){
                    listValueReturn.push(resultValue.value);
                }else{
                    listValueReturn.push(resultValue);
                }

            }else if(type.enumType != resultValue.type.enumType){
                ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`el tipo de valor no coincide con el tipo del array`,e.enviromentType));
                return null;
            }

         }

        return new Value(new Type(type.enumType,type.identifier),listValueReturn);
    }

}