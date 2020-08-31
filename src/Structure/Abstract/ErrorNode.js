class ErrorNode {
    /**
     * 
     * @param {*} line 
     * @param {*} column 
     * @param {*} errorType 
     * @param {*} description 
     * @param {*} environmentType 
     */
    constructor(line, column, errorType, description, environmentType) {
        this.line = line;
        this.column = column;
        this.errorType = errorType;
        this.description = description;
        this.environmentType = environmentType;
    }
}
