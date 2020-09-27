class NodeGraphAST{
    
    constructor(tag,numberNode){
        this.tag = tag;
        this.numberNode = numberNode;
        this.children = [];
    }

    stringFinalTreeTranslated(string){
        NumberNode.cleanNumberNode();
        var codeGraph = `graph TD\nNote(AST TRADUCCION)\n${string}`;
        return codeGraph;
    }

    stringFinalTreeExecute(string){
        NumberNode.cleanNumberNode();
        var codeGraph = `graph TD\nNote(AST EJECUCION)\n${string}`;
        return codeGraph;
    }

    totalString(root){
        root.tag = root.tag.replace("\"","");
        root.tag = root.tag.replace("\"","");
        root.tag = root.tag.replace("\'","");
        root.tag = root.tag.replace("\'","");
        root.tag = root.tag.replace("\`","");
        root.tag = root.tag.replace("\`","");

        var codeGraph = "";
        var nodeN = `node${root.numberNode}(("${root.tag}"))\n`;
        if(root.tag != 'null'){
            for(var i = 0; i != root.children.length;i++){
                if(root.children[i].tag != null || root.children[i].tag != 'null'){

                    root.children[i].tag = root.children[i].tag.replace("\"","");
                    root.children[i].tag = root.children[i].tag.replace("\"","");
                    root.children[i].tag = root.children[i].tag.replace("\'","");
                    root.children[i].tag = root.children[i].tag.replace("\'","");
                    root.children[i].tag = root.children[i].tag.replace("\`","");
                    root.children[i].tag = root.children[i].tag.replace("\`","");
                    
                    var tagH = `node${root.children[i].numberNode}(("${root.children[i].tag} "))\n`;
                    var code = `node${root.numberNode} --> node${root.children[i].numberNode}\n`;
                    codeGraph += nodeN + tagH + code;
                    codeGraph += this.totalString(root.children[i]);
                }
            }
        }
        return codeGraph;
    }

}