var EnumOperationType;
(function (EnumOperationType){
    EnumOperationType["PLUS_PLUS"] = "++";
    EnumOperationType["MINUS_MINUS"] = "--";
    EnumOperationType["PLUS"] = "+";
    EnumOperationType["MINUS"] = "-";
    EnumOperationType["MULTIPLICATION"] = "*";
    EnumOperationType["DIVISION"] = "/";
    EnumOperationType["POWER"] = "**";
    EnumOperationType["MODULE"] = "%";
    EnumOperationType["NEGATIVE"] = "-";
    EnumOperationType["AND"] = "&&";
    EnumOperationType["OR"] = "||";
    EnumOperationType["NOT"] = "!";
    EnumOperationType["DIFFERENT_THAN"] = "!=";
    EnumOperationType["LIKE_THAN"] = "==";
    EnumOperationType["MORE_EQUAL_TO"] = ">=";
    EnumOperationType["LESS_EQUAL_TO"] = "<=";
    EnumOperationType["MORE_THAN"] = ">";
    EnumOperationType["LESS_THAN"] = "<";
})(EnumOperationType || (EnumOperationType = {}));

class OperationType{
    constructor(enumOperationType){
        this.enumOperationType = enumOperationType;
    }

    toString(){
        return this.enumOperationType;
    }
}