class TreeGraph {
  static numberNode = 0;

  /**
   * contador a cero
   */
  static cleanNodeNumber() {
    TreeGraph.numberNode = 0;
  }

  static getNumberNode() {
    TreeGraph.numberNode++;
    return String("node" + TreeGraph.numberNode);
  }

  static generateLeafNodeExpresion(e) {
    return e.nodeName + "((" + e.value.toString() + "));\n";
  }

  /**
   * make leaf custom
   *
   * @param {*} name
   * @param {*} tag
   */
  static generateLeafCustom(name, tag) {
    return name + "((" + tag + "));\n";
  }

  /**
   *
   * @param {*} e
   * @param {*} tag
   */
  static generateNode(e, tag) {
    return e.nodeName + '(("' + tag + '"))';
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
  static generateChieldren(father, tag, chieldren) {
    if (chieldren instanceof Array) {
      var nodeFather = TreeGraph.generateNode(father, tag);
      var tmp = "";

      for (var i = 0; i < chieldren.length; i++) {
        tmp += chieldren[i].getGraphsCode();
      }

      tmp += nodeFather + ";\n";
      for (var i = 0; i < chieldren.length; i++) {
        tmp += chieldren[i].nodeName + ";\n";
      }

      for (var i = 0; i < chieldren.length; i++) {
        tmp += father.nodeName + " --> " + chieldren[i].nodeName + ";\n";
      }
      return tmp;
    }
  }

  static getCodeOfDeclaration(father, typeDaclaration, ids, type, value) {
    var nodeFather = TreeGraph.generateNode(father, "DECLARACION");
    var tmp = "";
    var fatherTempNamePrevious = "";
    var fatherTempName = "";
    var typeDeclarationName = "";
    var idName = "";
    var typeName = "";
    var valueName = "";
    var igualName = "";
    var fatherTempNode = "";
    var typeDeclarationNode = "";
    var idNode = "";
    var typeNode = "";
    var valueNode = "";
    var igualNode = "";

    for (var i = 0; i < ids.length; i++) {
      fatherTempName = TreeGraph.getNumberNode();
      typeDeclarationName = TreeGraph.getNumberNode();
      idName = TreeGraph.getNumberNode();
      
      fatherTempNode = TreeGraph.generateLeafCustom(fatherTempName,"DECLARACION");
      typeDeclarationNode = TreeGraph.generateLeafCustom(typeDeclarationName,typeDaclaration.toString());
      idNode = TreeGraph.generateLeafCustom(idName, ids[i]);
      
      if(type.enumType != EnumType.NULL){
        typeName = TreeGraph.getNumberNode();
        typeNode = TreeGraph.generateLeafCustom(typeName, type.toString());
      }

      if(value != ""){
        valueName = TreeGraph.getNumberNode();
        igualName = TreeGraph.getNumberNode();
        valueNode = TreeGraph.generateLeafCustom(valueName, value.value);
        igualNode = TreeGraph.generateLeafCustom(igualName, "=");
      }


      tmp += typeDeclarationNode;
      tmp += idNode;

      if(type.enumType != EnumType.NULL){
        tmp += typeNode;
      }
      
      if(value != ""){
        tmp += igualNode;
        tmp += valueNode;
      }

      if (ids.length == 1) {
        tmp += nodeFather + ";\n";
        tmp += father.nodeName + " --> " + typeDeclarationName + ";\n";
        tmp += father.nodeName + " --> " + idName + ";\n";
        
        if(type.enumType != EnumType.NULL){
          tmp += father.nodeName + " --> " + typeName + ";\n";
        }

        if(value != ""){
          tmp += father.nodeName + " --> " + igualName + ";\n";
          tmp += father.nodeName + " --> " + valueName + ";\n";
        }
        
      } else if (i == ids.length - 1) {
        tmp += nodeFather + ";\n";
        tmp += father.nodeName + " --> " + fatherTempNamePrevious + ";\n";
        tmp += father.nodeName + " --> " + typeDeclarationName + ";\n";
        tmp += father.nodeName + " --> " + idName + ";\n";
        
        if(type.enumType != EnumType.NULL){
          tmp += father.nodeName + " --> " + typeName + ";\n";
        }

        if(value != ""){
          tmp += father.nodeName + " --> " + igualName + ";\n";
          tmp += father.nodeName + " --> " + valueName + ";\n";
        }

      } else if (fatherTempNamePrevious == "") {
        tmp += fatherTempNode + ";\n";
        tmp += fatherTempName + " --> " + typeDeclarationName + ";\n";
        tmp += fatherTempName + " --> " + idName + ";\n";
        
        if(type.enumType != EnumType.NULL){
          tmp += fatherTempName + " --> " + typeName + ";\n";
        }

        if(value != ""){
          tmp += fatherTempName + " --> " + igualName + ";\n";
          tmp += fatherTempName + " --> " + valueName + ";\n";
        }

        fatherTempNamePrevious = fatherTempName;
      } else {
        tmp += fatherTempNode + ";\n";
        tmp += fatherTempName + " --> " + fatherTempNamePrevious + ";\n";
        tmp += fatherTempName + " --> " + typeDeclarationName + ";\n";
        tmp += fatherTempName + " --> " + idName + ";\n";
        
        if(type.enumType != EnumType.NULL){
          tmp += fatherTempName + " --> " + typeName + ";\n";
        }

        if(value != ""){
          tmp += fatherTempName + " --> " + igualName + ";\n";
          tmp += fatherTempName + " --> " + valueName + ";\n";
        }

        fatherTempNamePrevious = fatherTempName;
      }
    }

    return tmp;
  }

  static getCodeOfDeclarationArray(father, typeDaclaration, ids, type, dimensions,value) {
    var nodeFather = TreeGraph.generateNode(father, (`DECLARACION\n Dimenciones: ${dimensions}`));
    var tmp = "";
    var fatherTempNamePrevious = "";
    var fatherTempName = "";
    var typeDeclarationName = "";
    var idName = "";
    var typeName = "";
    var valueName = "";
    var igualName = "";
    var fatherTempNode = "";
    var typeDeclarationNode = "";
    var idNode = "";
    var typeNode = "";
    var valueNode = "";
    var igualNode = "";

    for (var i = 0; i < ids.length; i++) {
      fatherTempName = TreeGraph.getNumberNode();
      typeDeclarationName = TreeGraph.getNumberNode();
      idName = TreeGraph.getNumberNode();
      
      fatherTempNode = TreeGraph.generateLeafCustom(fatherTempName,(`DECLARACION\\n Dimenciones: ${dimensions}`));
      typeDeclarationNode = TreeGraph.generateLeafCustom(typeDeclarationName,typeDaclaration.toString());
      idNode = TreeGraph.generateLeafCustom(idName, ids[i]);
      
      if(type.enumType != EnumType.NULL){
        typeName = TreeGraph.getNumberNode();
        typeNode = TreeGraph.generateLeafCustom(typeName, type.toString());
      }

      if(value != ""){
        valueName = TreeGraph.getNumberNode();
        igualName = TreeGraph.getNumberNode();
        igualNode = TreeGraph.generateLeafCustom(igualName, "=");
        
        var cadena = "";
        for(var i=0;i < value.value[0].length;i++){
          if(i ==0){
            cadena += value.value[0][i].value;
          }else{
            cadena += "," + value.value[0][i].value;
          }
        }
        valueNode = TreeGraph.generateLeafCustom(valueName, cadena);
      }


      tmp += typeDeclarationNode;
      tmp += idNode;

      if(type.enumType != EnumType.NULL){
        tmp += typeNode;
      }
      
      if(value != ""){
        tmp += igualNode;
        tmp += valueNode;
      }

      if (ids.length == 1) {
        tmp += nodeFather + ";\n";
        tmp += father.nodeName + " --> " + typeDeclarationName + ";\n";
        tmp += father.nodeName + " --> " + idName + ";\n";
        
        if(type.enumType != EnumType.NULL){
          tmp += father.nodeName + " --> " + typeName + ";\n";
        }

        if(value != ""){
          tmp += father.nodeName + " --> " + igualName + ";\n";
          tmp += father.nodeName + " --> " + valueName + ";\n";
        }
        
      } else if (i == ids.length - 1) {
        tmp += nodeFather + ";\n";
        tmp += father.nodeName + " --> " + fatherTempNamePrevious + ";\n";
        tmp += father.nodeName + " --> " + typeDeclarationName + ";\n";
        tmp += father.nodeName + " --> " + idName + ";\n";
        
        if(type.enumType != EnumType.NULL){
          tmp += father.nodeName + " --> " + typeName + ";\n";
        }

        if(value != ""){
          tmp += father.nodeName + " --> " + igualName + ";\n";
          tmp += father.nodeName + " --> " + valueName + ";\n";
        }

      } else if (fatherTempNamePrevious == "") {
        tmp += fatherTempNode + ";\n";
        tmp += fatherTempName + " --> " + typeDeclarationName + ";\n";
        tmp += fatherTempName + " --> " + idName + ";\n";
        
        if(type.enumType != EnumType.NULL){
          tmp += fatherTempName + " --> " + typeName + ";\n";
        }

        if(value != ""){
          tmp += fatherTempName + " --> " + igualName + ";\n";
          tmp += fatherTempName + " --> " + valueName + ";\n";
        }

        fatherTempNamePrevious = fatherTempName;
      } else {
        tmp += fatherTempNode + ";\n";
        tmp += fatherTempName + " --> " + fatherTempNamePrevious + ";\n";
        tmp += fatherTempName + " --> " + typeDeclarationName + ";\n";
        tmp += fatherTempName + " --> " + idName + ";\n";
        
        if(type.enumType != EnumType.NULL){
          tmp += fatherTempName + " --> " + typeName + ";\n";
        }

        if(value != ""){
          tmp += fatherTempName + " --> " + igualName + ";\n";
          tmp += fatherTempName + " --> " + valueName + ";\n";
        }

        fatherTempNamePrevious = fatherTempName;
      }
    }

    return tmp;
  }

}
