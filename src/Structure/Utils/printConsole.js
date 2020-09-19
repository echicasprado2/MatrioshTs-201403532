class PrintConsole {
    static cadena = "";

    static cleanConsole(){
        PrintConsole.cadena = "";
    }

    static printLine(cadena){
        PrintConsole.cadena = `${PrintConsole.cadena}${cadena}\n`;
    }

    static print(cadena){
        PrintConsole.cadena = `${PrintConsole.cadena}${cadena}`;
    }

    static getPrintConsole(){
        return PrintConsole.cadena;
    }

}