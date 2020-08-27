class Print extends Instuccion {
    constructor(linea, column, expresion) {
        super(linea, column);
        this.value = expresion;
        // this.nodeName = Static.treeGraph.getNumberNode();
    }
    execute(e) {
        throw new Error("Method not implemented.");
    }
}
