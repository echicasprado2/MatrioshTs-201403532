class TreeGraph {
    
    static numberNode = 0;

    static getNumberNode() {
        TreeGraph.numberNode++;
        return String("node" + TreeGraph.numberNode);
    }

    static generateLeafNodeExpresion(e) {
        return e.nodeName + "((" + e.value.toString() + "))";
    }

    static generateNode(e, tag) {
        return e.nodeName + "((" + tag + "))";
    }

    static generateOneChield(father, tag, chield) {
        var tmp = TreeGraph.generateNode(father, tag);
        tmp += " --> ";
        tmp += chield.graphcsCode;
        tmp += ";\n";
        return tmp;
    }
}
