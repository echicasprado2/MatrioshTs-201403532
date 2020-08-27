class Expresion extends Node {
    constructor(line, column, type, value) {
        super(line, column);
        this.type = type;
        this.value = value || null;
    }
}
