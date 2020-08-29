
class TreeGraph {
    
    static numberNode = 0;

    static cleanNodeNumber(){
        TreeGraph.numberNode = 0;
    }

    static getNumberNode() {
        TreeGraph.numberNode++;
        return String("node" + TreeGraph.numberNode);
    }

    static generateLeafNodeExpresion(e) {
        return e.nodeName + "((" + e.value.toString() + "));\n";
    }

    static generateNode(e, tag) {
        return e.nodeName + "((\"" + tag + "\"))";
    }

    static generateOneChield(father, tag, chield) {
        var tmp = chield.graphcsCode;
        tmp += TreeGraph.generateNode(father, tag) + ";\n";
        tmp += chield.nodeName + ";\n";
        tmp += father.nodeName + " --> " + chield.nodeName + ";\n";
        return tmp;
    }

    static generateChieldren(father,tag,chieldren){
        if(chieldren instanceof Array){
            var nodeFather = TreeGraph.generateNode(father, tag);
            var tmp = "";

            for(var i=0;i<chieldren.length;i++){
                var item = chieldren[i];
                tmp += item.graphcsCode;
            }

            tmp += nodeFather + ";\n"
            for(var i=0;i<chieldren.length;i++){
                var item = chieldren[i];
                tmp += item.nodeName + ";\n";
            }

            for(var i=0;i < chieldren.length;i++){
                var item = chieldren[i];
                tmp += father.nodeName + " --> " + item.nodeName + ";\n";
            }
            return tmp;
        }
    }

}
