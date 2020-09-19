
// CODEMIRROR
var editEntrada = CodeMirror.fromTextArea(document.getElementById('textarea-editor-entrada'),{
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true
});

var editSalida = CodeMirror.fromTextArea(document.getElementById('textarea-editor-salida'),{
    mode: "javascript",
    theme: "lucario",
    lineNumbers: true
});

var consoleShow = CodeMirror.fromTextArea(document.getElementById('textarea-console'),{
    mode: "javascript",
    theme: "colorforth",
    lineNumbers: false
});

// MERMAID
mermaid.initialize({startOnLoad:false});

// FUNCIONES PARA OBTENER CODEMIRROR
function getEditor(){
  var codeMirrorTextArea = $('.CodeMirror');
  var tmp = codeMirrorTextArea[0].CodeMirror;
  return tmp;
}

function getSalida(){
  var codeMirrorTextArea = $('.CodeMirror');
  var tmp = codeMirrorTextArea[1].CodeMirror;
  return tmp;
}

function getConsole(){
  var codeMirrorTextArea = $('.CodeMirror');
  var tmp = codeMirrorTextArea[2].CodeMirror;
  return tmp;
}

var openFile = document.getElementById('open-file');
openFile.addEventListener('change', (event) => {
    const fileUpload = event.target.files;
    console.log(fileUpload);

    if(fileUpload.lenght == 0){
        alert('Error: Seleccione un archivo');
        return;
    }

    var reader = new FileReader();
    reader.addEventListener('load',function(e){
        var text = e.target.result;    
        var editor = getEditor();
        editor.setValue(text);
    });
    reader.readAsText(fileUpload[0]);
  }
);

var translate = document.getElementById('traducir');
translate.addEventListener('click',(e)=>{
    var editor = getEditor();
    var result = new AST(Gramatica.parse(editor.getValue()));// obtengo el ast al correr el analizador
  
    result.translatedSymbolsTable();//obtengo la tabla de simbolos para la traduccion
    showTableTranslatedSymbols();//muestro la tabla de simbolos para la traduccion

    // EJECUTO EL METODO TRADUCIR
    var myTranslated = getSalida();//creo un objeto donde mostrare la salida traducida de mi entrada
    myTranslated.setValue(result.getTranslated());//inserto el codigo traduccido
  
    showTranslatedTree(editor.getValue());
  }
);

var execute = document.getElementById('ejecutar');
execute.addEventListener('click',(e)=>{
    //TODO implement
    var editor = getSalida();
    var myConsole = getConsole();
    var result = new AST(Gramatica.parse(editor.getValue()));
    
    // result.executeSymbolsTable();// TODO tengo duda esta lo debe de generar la traduccion
    // showTableExecute();// TODO implementar
    
    result.execute();
    
    myConsole.setValue(PrintConsole.getPrintConsole());
    showTableExecuteSymbols();
    showTableErrorsSymbols();
    showExecuteTree(editor.getValue());
  }
);

function showTranslatedTree(file){
  NumberNode.cleanNumberNode();

  var ast = GraphGrammar.parse(file);
  var code = ast.stringFinalTreeTranslated(ast.totalString(ast));
    
  //genera el arbol y da error
  var element = document.querySelector("showTranslatedTree");
  var insertSvg = function(svgCode){
    element.innerHTML = svgCode;
  };
    
  // console.log(code);
  var graph = mermaid.render('showTranslatedTree',code,insertSvg);
}

function showExecuteTree(file){
  NumberNode.cleanNumberNode();

  var ast = GraphGrammar.parse(file);
  var code = ast.stringFinalTreeExecute(ast.totalString(ast));

  // genera el arbol y da error
  var element = document.querySelector("myGraphExecute");
  var insertSvg = function(svgCode){
    element.innerHTML = svgCode;
  };

  // console.log(code);
  var graph = mermaid.render('myGraphExecute',code,insertSvg);
}

function showTableTranslatedSymbols(){
  document.getElementById('tableTranslated').innerHTML = "";
    
  var html = "<h2>Tabla de simbolos traduccion</h2>\n";
  html += "<table class=\"table table-dark\" id=\"tableTranslated\">";
  html += "<thead class=\"thead-light\">";
  html += "<tr>";
  html += "<th scope=\"col\">#</th>";
  html += "<th scope=\"col\">IDENTIFICADOR</th>";
  html += "<th scope=\"col\">ENTORNO</th>";
  html += "</tr>";
  html += " </thead>";
  html += "<tbody>";
  
  var nodes = TableReport.getNodesTranslated();
  for(var i = 0; i < nodes.length; i++){
    var item = nodes[i];
    html += "<tr>";
    html += `<td>${i + 1}</td>`;
    html += `<td>${item.name}</td>`;
    html += `<td>${item.typeEnviroment}</td>`;
    html += "</tr>";
  }

  html += "</tbody>";
  html += "</table>";
  document.getElementById('tableTranslated').innerHTML = html;
};

function showTableExecuteSymbols(){
  document.getElementById('tableExecute').innerHTML = "";

  var html = "<h2>Tabla de simbolos ejecucion</h2>\n";
  html += "<table class=\"table table-dark\" id=\"tableExecute\">";
  html += "<thead class=\"thead-light\">";
  html += "<tr>";
  html += "<th scope=\"col\">#</th>";
  html += "<th scope=\"col\">IDENTIFICADOR</th>";
  html += "<th scope=\"col\">ENTORNO</th>";
  html += "<th scope=\"col\">LINEA</th>";
  html += "<th scope=\"col\">COLUMNA</th>";
  html += "<th scope=\"col\">VALOR</th>";
  html += "</tr>";
  html += " </thead>";
  html += "<tbody>";

  var nodes = TableReport.getNodesExecute();
  for(var i = 0; i < nodes.length; i++){
    var item = nodes[i];
    html += "<tr>";
    html += `<td>${i + 1}</td>`;
    html += `<td>${item.name}</td>`;
    html += `<td>${item.typeEnviroment}</td>`;
    html += `<td>${item.line}</td>`;
    html += `<td>${item.column}</td>`;
    html += `<td>${item.value}</td>`;
    html += "</tr>";
  }

  html += "</tbody>";
  html += "</table>";
  document.getElementById('tableExecute').innerHTML = html;
}

function showTableErrorsSymbols(){
  document.getElementById('tableErrors').innerHTML = "";

  var html = "<h2>Tabla de errores</h2>\n";
  html += "<table class=\"table table-dark\" id=\"tableErrors\">";
  html += "<thead class=\"thead-light\">";
  html += "<tr>";
  html += "<th scope=\"col\">#</th>";
  html += "<th scope=\"col\">LINEA</th>";
  html += "<th scope=\"col\">COLUMNA</th>";
  html += "<th scope=\"col\">TIPO DE ERROR</th>";
  html += "<th scope=\"col\">DESCRIPCION</th>";
  html += "<th scope=\"col\">ENTORNO</th>";
  html += "</tr>";
  html += " </thead>";
  html += "<tbody>";

  var nodes = ErrorList.getErrorList();
  for(var i = 0; i < nodes.length; i++){
    var item = nodes[i];
    html += "<tr>";
    html += `<td>${i + 1}</td>`;
    html += `<td>${item.line}</td>`;
    html += `<td>${item.column}</td>`;
    html += `<td>${item.errorType.toString()}</td>`;
    html += `<td>${item.description}</td>`;
    html += `<td>${item.environmentType.toString()}</td>`;
    html += "</tr>";
  }

  html += "</tbody>";
  html += "</table>";
  document.getElementById('tableErrors').innerHTML = html;
}
