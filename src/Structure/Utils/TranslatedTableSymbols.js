class nodeTableSymbols{
    /**
     * 
     * @param {*} line 
     * @param {*} column 
     * @param {*} name 
     * @param {*} typeEnviroment 
     */
    constructor(line,column,name,typeEnviroment){
        this.line = line;
        this.column = column;
        this.name = name;
        this.typeEnviroment = typeEnviroment;
    }
}


class TranslatedTableSymbols {
  static nodes = [];

  clean() {
    EnviromentTranslatedGraph.nodes = [];
  }

  static add(node) {
    EnviromentTranslatedGraph.nodes.push(node);
  }

  static getNodes() {
    return EnviromentTranslatedGraph.nodes;
  }
}
