var EnumOperationType;
(function (EnumOperationType){
    EnumOperationType["PLUS_PLUS"] = "++";
    EnumOperationType["MINUS_MINUS"] = "--";
    EnumOperationType["PLUS"] = "+";
    EnumOperationType["MINUS"] = "-";
    EnumOperationType["MULTIPLICATION"] = "*";
    EnumOperationType["DIVISION"] = "/";
    EnumOperationType["POWER"] = "^";
    EnumOperationType["MODULE"] = "%";
    EnumOperationType["NEGATIVE"] = "-";
    EnumOperationType["AND"] = "&&";
    EnumOperationType["OR"] = "||";
    EnumOperationType["NOT"] = "!";
    EnumOperationType["!="] = "!=";
    EnumOperationType["=="] = "==";
    EnumOperationType[">="] = ">=";
    EnumOperationType["<="] = "<=";
    EnumOperationType[">"] = ">";
    EnumOperationType["<"] = "<";
})(EnumOperationType || (EnumOperationType = {}));

class OperationType{
    constructor(enumOperationType){
        this.enumOperationType = enumOperationType;
    }

    toString(){
        return this.enumOperationType.toString();
    }
}