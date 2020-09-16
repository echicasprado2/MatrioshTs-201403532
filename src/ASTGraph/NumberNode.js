class NumberNode {
    static numberNode = 0;

    static cleanNumberNode(){
        NumberNode.numberNode = 0;
    }
    
    static getNumber(){
        NumberNode.numberNode++;
        return NumberNode.numberNode;
    }

}