
// CODEMIRROR
var editEntrada = CodeMirror.fromTextArea(document.getElementById('textarea-editor-entrada'),{
    mode: "javascript",
    theme: "monokai",
    lineNumbers: true
});

var editEntrada = CodeMirror.fromTextArea(document.getElementById('textarea-editor-salida'),{
    mode: "javascript",
    theme: "material-ocean",
    lineNumbers: true
});

var consoleShow = CodeMirror.fromTextArea(document.getElementById('textarea-console'),{
    mode: "",
    theme: "material-ocean",
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

  // ABRIR ARCHIVO
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
  });


  var translate = document.getElementById('traducir');
  translate.addEventListener('click',(e)=>{

    TreeGraph.cleanNodeNumber();
    
    var editor = getEditor();
    
    var result = new AST(Gramatica.parse(editor.getValue()));// obtengo el ast al correr el analizador
    result.translatedSymbolsTable();//obtengo la tabla de simbolos para la traduccion
    showTableTranslatedSymbols();//muestro la tabla de simbolos para la traduccion
  
    // EJECUTO EL METODO TRADUCIR
    var myTranslated = getSalida();//creo un objeto donde mostrare la salida traducida de mi entrada
    myTranslated.setValue(result.getTranslated());//inserto el codigo traduccido
    showTranslatedTree(editor.getValue());
  });

  var execuse = document.getElementById('ejecutar');
  execuse.addEventListener('click',(e)=>{
    //TODO implement
  });

  //TODO make show translated tree
  function showTranslatedTree(file){
    var ast = GraphGrammar.parse(file);
    var code = ast.stringFinalTree(ast.totalString(ast));
    
    //genera el arbol y da error
    var element = document.querySelector("myGraphTranslated");
    var insertSvg = function(svgCode){
      element.innerHTML = svgCode;
    };
    
    console.log(code);
    var graph = mermaid.render('myGraph',code,insertSvg);
  }

  //TODO make show execute tree
  function showExecuseTree(){
    //genera el arbol y da error
    // var element = document.querySelector("myGraphExecuse");
    // var insertSvg = function(svgCode){
    //   element.innerHTML = svgCode;
    // };
    
    // var grapDefinition = `graph TD;\n ${treeCode}`;
    // console.log(grapDefinition);
    // var graph = mermaid.render('myGraph',grapDefinition,insertSvg);
  }

//TODO make show translated table
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

//TODO make show execuse table
  function showTableExecuse(){
    // <h2>Tabla de simbolos ejecucion</h2>
    //                 <table class="table table-dark" id="tableExecuse">
    //                     <thead  class="thead-light">
    //                         <tr>
    //                             <th scope="col">#</th>
    //                             <th scope="col">IDENTIFICADOR</th>
    //                             <th scope="col">ENTORNO</th>
    //                             <th scope="col">Valor</th>
    //                             <th scope="col">Linea</th>
    //                             <th scope="col">Columna</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                     </tbody>
    //                 </table>
    var html = "";
    document.getElementById('tableExecuse').innerHTML = html;
  }