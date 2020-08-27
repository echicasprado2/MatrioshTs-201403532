class TreeGraph {
    constructor() {
        this.numberNode = 0;
    }
    getNumberNode() {
        this.numberNode++;
        return String("node" + this.numberNode);
    }
    generateLeafNodeExpresion(e) {
        return e.nodeName + "((" + e.value.toString() + "))";
    }
    generateNode(e, tag) {
        return e.nodeName + "((" + tag + "))";
    }
    generateOneChield(father, tag, chield) {
        var tmp = chield.nodeName;
        tmp += Static.treeGraph.generateNode(father, tag);
        tmp += father.nodeName;
        tmp += " --> ";
        tmp += chield.nodeName;
        return tmp;
    }
}
