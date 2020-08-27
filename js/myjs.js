
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
    var editor = getEditor();
    //var parserSource = generator.generate({moduleName: "Gramatica"});

    //console.log(editor.getValue());
    // console.log();
    var result = Gramatica.parse(editor.getValue());
    
    var myConsole = getConsole();
    myConsole.setValue("");
    
    // document.getElementById('prueba').innerHTML =`<div class=\"mermaid\"><br\>graph TD;\n ${result.graphcsCode}</div>`;

    var element = document.querySelector("myGraph");
    var insertSvg = function(svgCode,brindFunctions){
      element.innerHTML = svgCode;
    };
    
    var grapDefinition = `graph TD;\n ${result.graphcsCode}`;
    var graph = mermaid.render('myGraph',grapDefinition,insertSvg);
    // document.getElementById("myGraph").innerHTML = graph;

  });