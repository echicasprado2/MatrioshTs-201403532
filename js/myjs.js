
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
    var treeCode = result.getGraphCode();// codigo para hace el grafo
    result.translatedSymbolsTable();//obtengo la tabla de simbolos para la traduccion
    showTableTranslatedSymbols();//muestro la tabla de simbolos para la traduccion
  
    var myTranslated = getSalida();//creo un objeto donde mostrare la salida traducida de mi entrada
    myTranslated.setValue(result.getTranslated());//inserto el codigo traduccido
    
    //genera el arbol y da error
    var element = document.querySelector("myGraph");

    var insertSvg = function(svgCode){
      element.innerHTML = svgCode;
    };
    
    var grapDefinition = `graph TD;\n ${treeCode}`;
    // console.log(grapDefinition);
    var graph = mermaid.render('myGraph',grapDefinition,insertSvg);
    
    
  });


  function showTableTranslatedSymbols(){
    /* FIXME buscar una forma de limpiar el tbody de la tabla o 
    * crear la tabla cada con html a la medida y luego hacer un innerhtml en el div 
    */
    var table = document.getElementById('tableTranslated').getElementsByTagName('tbody')[0];
    var nodes = TableReport.getNodesTranslated();

    for(var i=0;i<nodes.length;i++){
      var item = nodes[i];
      var newRow = table.insertRow(table.rows.length);
      var idCell = newRow.insertCell(0);
      var nameCell = newRow.insertCell(1);
      var environmentCell = newRow.insertCell(2);
      
      var textIdCell = document.createTextNode((i+1).toString());
      var textNameCell = document.createTextNode(item.name);
      var textEnvironmentCell = document.createTextNode(item.typeEnviroment);

      idCell.appendChild(textIdCell);
      nameCell.appendChild(textNameCell);
      environmentCell.appendChild(textEnvironmentCell);
    }


  };