class printConsole {
    static cadena = "";

    static cleanConsole(){
        printConsole.cadena = "";
    }

    static printLine(cadena){
        printConsole.cadena = `${printConsole.cadena}${cadena}\n`;
    }

    static print(cadena){
        printConsole.cadena = `${printConsole.cadena}${cadena}`;
    }

    static getPrintConsole(){
        return printConsole.cadena;
    }

}