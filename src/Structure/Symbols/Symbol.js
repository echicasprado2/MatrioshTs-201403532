class Symbol {
   
    /**
     * 
     * @param {*} line 
     * @param {*} column 
     * @param {*} id 
     * @param {*} type 
     * @param {*} typeDeclaration 
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
