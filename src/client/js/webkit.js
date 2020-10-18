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

function submit() {
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
        console.log("Submitted with result:", result);
    });
}

runAgainst = (botName) => {
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
    });
}

function botsMenu() {
    
}

function addBots(bots) {
	bots.forEach(botName => {
		let tr = document.createElement("tr");
		
		let nametag = document.createElement("td");
		let nametext = document.createTextNode(botName);
		nametag.appendChild(nametext);

		let playtag = document.createElement("td");
		let playbutton = document.createElement("button");
		playbutton.setAttribute("class", "play");
		playbutton.setAttribute("onclick", `runAgainst("${botName}")`);
		playbutton.textContent = "Play Against";
		playtag.appendChild(playbutton);

		tr.appendChild(nametag);
		tr.appendChild(playtag);

		let table = document.getElementById("tableBots");
		table.appendChild(tr);
	});

	html = document.documentElement.innerHTML;
	return html;
}

