class GraphTs extends Instruction {
    constructor(linea,column){
        super(linea,column);
        this.translatedCode = "";
    }

    getTranslated(){
        this.translatedCode = "graficar_ts()";
        return this.translatedCode+ "\n";
    }

    translatedSymbolsTable(e){
        TableReport.addTranslated(
            new NodeTableSymbols(
              this.linea,
              this.column,
              "GRAPTH_TS",
              null,
              e.enviromentType,
              null
            )
        );
    }

    executeSymbolsTable(e){
        return "implementar";
    }

    execute(e) {
        //TODO implemented this
        let html = "";
        
        if(ShowGraphTs.existReport()){
            html += "</br>";
            html += "</br>";
        }

        html += `<table class="table table-dark">`;
        html += `<caption>GRAFICA TS No.${ShowGraphTs.getNumberReport()}</caption>`;
        html += `<thead class="thead-light">`;
        html += `<tr>`;
        html += `<th scope="col">#</th>`;
        html += `<th scope="col">IDENTIFICADOR</th>`;
        html += `<th scope="col">TIPO</th>`;
        html += `<th scope="col">LINEA</th>`;
        html += `<th scope="col">COLUMNA</th>`;
        html += `<th scope="col">VALOR</th>`;
        html += `<th scope="col">ENTORNO</th>`;
        html += `</tr>`;
        html += `</thead>`;
        html += `<tbody>`;


        

        html += `</tbody>`;
        html += `</table>`;

        return null;
    }

}