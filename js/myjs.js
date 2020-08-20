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

console.log(editEntrada);