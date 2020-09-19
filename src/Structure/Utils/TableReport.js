class NodeTableSymbols{
    /**
     * 
     * @param {*} line 
     * @param {*} column 
     * @param {*} name 
     * @param {*} typeEnviroment 
     */
    constructor(line,column,name,typeEnviroment,value){
        this.line = line;
        this.column = column;
        this.name = name;
        this.typeEnviroment = typeEnviroment;
        this.value = value;
    }
}


class TableReport {
  static nodesTranslated = [];
  static nodesExecute = [];

  static cleanTranslated() {
    TableReport.nodesTranslated = [];
  }

  static cleanExecute(){
    TableReport.nodesExecute = [];
  }

  static addTranslated(node) {
    if(node.typeEnviroment == EnumEnvironmentType.FUNCTION){
      node.typeEnviroment = node.typeEnviroment.name;
    }
    TableReport.nodesTranslated.push(node);
  }

  static getNodesTranslated() {
    return TableReport.nodesTranslated;
  }

  static addExecute(node){
    TableReport.nodesExecute.push(node);
  }

  static getNodesExecute(){
    return TableReport.nodesExecute;
  }

}
