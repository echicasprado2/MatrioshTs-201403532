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

}