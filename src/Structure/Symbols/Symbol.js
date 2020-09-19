class Symbol {
   
    /**
     * 
     * @param {*} id 
     * @param {*} typeDeclaration 
     * @param {*} type 
     * @param {*} value 
     */
    constructor(id, type, typeDeclaration, value) {
        this.typeDeclaration = typeDeclaration;
        this.type = type;
        this.id = id;
        this.value = value;
    }
}
