const config = {
    lineNumbers: true,
    mode: "text/x-python",
    theme: "ambiance",
    indentWithTabs: true,
    indentUnit: 4,
    autoCloseBrackets: true,
    matchBrackets: true,
    showHint: true
};

window.onload = () => {
    console.log("window onload");
}

const editor = CodeMirror.fromTextArea(document.getElementById("code"), config);

editor.on('inputRead', function onChange(editor, input) {
    if (input.text[0] === ';' || input.text[0] === ' ' || input.text[0] === ":") {
        return;
    }
    editor.showHint({
        hint: CodeMirror.pythonHint
    });
});

// console.log(docHeight = document.body.clientHeight)
// console.log(editor.doc.height)
// console.log((docHeight * 0.7) >> 0)
// CodeMirror.height = docHeight

/*function selectTheme() {
    editor.setOption("theme", "solarized dark");
}
setTimeout(selectTheme, 5000);*/

function Submit() {
	let code = editor.getValue();
    console.log(code)
    
    fetch("/submit", {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify({
            "group": "Doraz",
            "sender": "Matan Raz",
            "date": new Date(),
            "code": code
        })
    }).then(result => {
        // do something with the result
        console.log("Completed with result:", result);
    });
}
