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

  static getCodeOfDeclaration(father, typeDaclaration, ids, type) {
    var nodeFather = TreeGraph.generateNode(father, "DECLARACION");
    var tmp = "";

    var fatherTempNamePrevious = "";
    var fatherTempName = "";
    var typeDeclarationName = "";
    var idName = "";
    var typeName = "";
    var fatherTempNode = "";
    var typeDeclarationNode = "";
    var idNode = "";
    var typeNode = "";

    for (var i = 0; i < ids.length; i++) {
      fatherTempName = TreeGraph.getNumberNode();
      typeDeclarationName = TreeGraph.getNumberNode();
      idName = TreeGraph.getNumberNode();
      typeName = TreeGraph.getNumberNode();

      fatherTempNode = TreeGraph.generateLeafCustom(
        fatherTempName,
        "DECLARACION"
      );
      typeDeclarationNode = TreeGraph.generateLeafCustom(
        typeDeclarationName,
        typeDaclaration.toString()
      );
      idNode = TreeGraph.generateLeafCustom(idName, ids[i]);
      typeNode = TreeGraph.generateLeafCustom(typeName, type.toString());

      tmp += typeDeclarationNode;
      tmp += idNode;
      tmp += type.enumType == EnumType.NULL ? "" : (typeNode);

      if (ids.length == 1) {
        tmp += nodeFather + ";\n";
        tmp += father.nodeName + " --> " + typeDeclarationName + ";\n";
        tmp += father.nodeName + " --> " + idName + ";\n";
        tmp += type.enumType == EnumType.NULL ? "" : (father.nodeName + " --> " + typeName + ";\n");
      } else if (i == ids.length - 1) {
        tmp += nodeFather + ";\n";
        tmp += father.nodeName + " --> " + fatherTempNamePrevious + ";\n";
        tmp += father.nodeName + " --> " + typeDeclarationName + ";\n";
        tmp += father.nodeName + " --> " + idName + ";\n";
        tmp += type.enumType == EnumType.NULL ? "" : (father.nodeName + " --> " + typeName + ";\n");
      } else if (fatherTempNamePrevious == "") {
        tmp += fatherTempNode + ";\n";
        tmp += fatherTempName + " --> " + typeDeclarationName + ";\n";
        tmp += fatherTempName + " --> " + idName + ";\n";
        tmp += type.enumType == EnumType.NULL ? "" : (fatherTempName + " --> " + typeName + ";\n");
        fatherTempNamePrevious = fatherTempName;
      } else {
        tmp += fatherTempNode + ";\n";
        tmp += fatherTempName + " --> " + fatherTempNamePrevious + ";\n";
        tmp += fatherTempName + " --> " + typeDeclarationName + ";\n";
        tmp += fatherTempName + " --> " + idName + ";\n";
        tmp += type.enumType == EnumType.NULL ? "" : (fatherTempName + " --> " + typeName + ";\n");
        fatherTempNamePrevious = fatherTempName;
      }
    }

    return tmp;
  }
}
