class ErrorList{

    static errorList = [];

    static cleanErrorList(){
        ErrorList.errorList = [];
    }

    static addError(node){
        ErrorList.errorList.push(node);
    }

    static getErrorList(){
        return ErrorList.errorList;
    }

    static isErrors(){
        if(ErrorList.errorList.length === 0){
            return true;
        }else{
            return false;
        }
    }

    static showErrors(){
        var item;
        for(var i = 0; i <  ErrorList.errorList.length; i++){
            item = ErrorList.errorList[i];
            PrintConsole.printLine(`Error tipo: ${item.errorType} Linea: ${item.line} Columna: ${item.column} Descripcion: ${item.description} Entorno: ${item.environmentType.toString()}`);
        }
    }

}