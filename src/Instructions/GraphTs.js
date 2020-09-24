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
        let html = "";
        let numberItem = 1;
        
        if(ShowGraphTs.existReport()){
            html += "</br>";
            html += "</br>";
        }

        html += `<table class="table table-dark">`;
        html += `<caption>GRAFICA TS No.${ShowGraphTs.getNumberReport()} Utilizado en Linea: ${this.line} </caption>`;
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

        for(var env = e; env != null; env = env.previous){

            env.table.forEach(element => {
                
                html += `<tr>`;
                html += `<td>${numberItem}</td>`;
                html += `<td>${element.id}</td>`;
                html += `<td>${element.type.toString()}</td>`;
                html += `<td>${element.line}</td>`;
                html += `<td>${element.column}</td>`;
                
                if(element.value instanceof Function || element.value instanceof TypeDefinition){
                    html += `<td>${null}</td>`;
                }else if (element.value instanceof Value){
                    
                    if(element.value.value instanceof Array){
                        html += `<td>${TableReport.getRealValue(element.value.value)}</td>`;
                    }else{
                        html += `<td>${element.value.value.toString()}</td>`;
                    }

                }
    
                html += `<td>${env.enviromentType.toString()}</td>`;
                html += `</tr>`;
                numberItem++;
            });

        }

        html += `</tbody>`;
        html += `</table>`;
        ShowGraphTs.addReport(html);
        return null;
    }

}