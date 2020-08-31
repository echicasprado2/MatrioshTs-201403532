class Environment {
    constructor(previous, environmentType) {
        this.previous = previous;
        this.enviromentType = environmentType;
        this.table = new Map();
    }
}
