class NodeGraphAST{
    
    constructor(tag,numberNode){
        this.tag = tag;
        this.numberNode = numberNode;
        this.children = [];
    }

    stringFinalTree(string){
        NumberNode.cleanNumberNode();
        var codeGraph = `graph TD\n${string}`;
        return codeGraph;
    }

    totalString(root){
        var codeGraph = "";
        var nodeN = `node${root.numberNode}(("${root.tag}"))\n`;
        if(root.tag != 'null'){
            for(var i = 0; i != root.children.length;i++){
                if(root.children[i].tag != 'null'){
                    var tagH = `node${root.children[i].numberNode}(("${root.children[i].tag}"))\n`;
                    var code = `node${root.numberNode} --> node${root.children[i].numberNode}\n`;
                    codeGraph += nodeN + tagH + code;
                    codeGraph += this.totalString(root.children[i]);
                }
            }
        }
        return codeGraph;
    }

}