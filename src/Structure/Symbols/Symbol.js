class Symbol {
   
    /**
     * 
     * @param {*} id 
     * @param {*} typeDeclaration 
     * @param {*} type 
     * @param {*} value 
     */
    constructor(line,column,id, type, typeDeclaration, value) {
        this.line = line;
        this.column = column;
        this.id = id;
        this.type = type;
        this.typeDeclaration = typeDeclaration;
        this.value = value;
    }
}
