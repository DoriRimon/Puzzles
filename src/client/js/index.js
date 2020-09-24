const config = {
    lineNumbers: true,
    mode: "text/x-python",
    theme: "ambiance",
    indentWithTabs: true,
    indentUnit: 4,
    autoCloseBrackets: true,
    matchBrackets: true
};

const editor = CodeMirror.fromTextArea(document.getElementById("code"), config);


console.log(docHeight = document.body.clientHeight)
console.log(editor.doc.height)
console.log((docHeight * 0.7) >> 0)
CodeMirror.height = docHeight

/*function selectTheme() {
    editor.setOption("theme", "solarized dark");
}
setTimeout(selectTheme, 5000);*/


function Submit() {
    let code = editor.getValue();
    console.log(editor.getValue())
}