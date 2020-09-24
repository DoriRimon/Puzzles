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

// console.log(docHeight = document.body.clientHeight)
// console.log(editor.doc.height)
// console.log((docHeight * 0.7) >> 0)
// CodeMirror.height = docHeight

/*function selectTheme() {
    editor.setOption("theme", "solarized dark");
}
setTimeout(selectTheme, 5000);*/

window.onload = function() {
	AddBots(["super bot 1", "super crazy bot 2"]);
}

function Submit() {
	let code = editor.getValue();
	console.log(code)
}

function AddBots(bots) {
	bots.forEach(botName => {
		let tr = document.createElement("tr");
		
		let nametag = document.createElement("td");
		let nametext = document.createTextNode(botName);
		nametag.appendChild(nametext);

		let playtag = document.createElement("td");
		let playbutton = document.createElement("button");
		playbutton.setAttribute("class", "play");
		playbutton.textContent = "Play Against";
		playtag.appendChild(playbutton);

		tr.appendChild(nametag);
		tr.appendChild(playtag);

		let table = document.getElementById("tableBots");
		table.appendChild(tr);
	});
}