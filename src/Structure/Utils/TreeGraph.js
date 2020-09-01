
class TreeGraph {
    
    static numberNode = 0;

    /**
     * contador a cero
     */
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
    
    /**
     * 
     * @param {*} father 
     * @param {*} tag 
     * @param {*} chield 
     */
    static generateOneChield(father, tag, chield) {
        var tmp = chield.getGraphsCode();
        tmp += TreeGraph.generateNode(father, tag) + ";\n";
        tmp += chield.nodeName + ";\n";
        tmp += father.nodeName + " --> " + chield.nodeName + ";\n";
        return tmp;
    }

    /**
     * father - Node
     * tag - name
     * chieldren - array of Nodes
     * @param {*} father 
     * @param {*} tag 
     * @param {*} chieldren 
     */
    static generateChieldren(father,tag,chieldren){

        if(chieldren instanceof Array){
            var nodeFather = TreeGraph.generateNode(father, tag);
            var tmp = "";

            for(var i=0;i<chieldren.length;i++){
                tmp += chieldren[i].getGraphsCode();
            }

            tmp += nodeFather + ";\n"
            for(var i=0;i<chieldren.length;i++){
                tmp += chieldren[i].nodeName + ";\n";
            }

            for(var i=0;i < chieldren.length;i++){
                tmp += father.nodeName + " --> " + chieldren[i].nodeName + ";\n";
            }
            return tmp;
        }
    }

}
