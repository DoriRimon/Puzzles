const config = {
    lineNumbers: true,
    mode: 'text/x-python',
    theme: 'ambiance',
    indentWithTabs: true,
    indentUnit: 4,
    autoCloseBrackets: true,
    matchBrackets: true,
    showHint: true
};

window.onload = () => {
    console.log('window onload');
}

const editor = CodeMirror.fromTextArea(document.getElementById('code'), config);

editor.on('inputRead', function onChange(editor, input) {
    if (input.text[0] === ';' || input.text[0] === ' ' || input.text[0] === ':') {
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
    editor.setOption('theme', 'solarized dark');
}
setTimeout(selectTheme, 5000);*/

<<<<<<< HEAD
Submit = () => {
=======
function submit() {
>>>>>>> 18f8b6c5716ec2e771473aa60666a7576f5ba8cf
	let code = editor.getValue();
    console.log(code)
    
    fetch('/submit', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({
            'group': 'Doraz',
            'sender': 'Matan Raz',
            'date': new Date(),
            'code': code
        })
    }).then(result => {
        // do something with the result
<<<<<<< HEAD
        console.log("Submitted with result:", result);
    });
}

RunAgainst = (botName) => {
    fetch("/run", {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify({
            "code": code,
            "botName": botName
        })
    }).then(result => {
        // do something with the result
        console.log("Ran against bot with result:", result);
=======
        console.log('Completed with result:', result);
>>>>>>> 18f8b6c5716ec2e771473aa60666a7576f5ba8cf
    });
}
