const express = require('express');
const app = express();
const port = 3000;
const parser = require("jsdom");

app.get('/', (req, res) => {
  
  res.send('Hello World!');
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})

function AddBots(html, bots) {
	const dom = new parser.JSDOM(html);
	const document = dom.window.document;

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

	html = document.documentElement.innerHTML;
	return html;
}

html = `<!DOCTYPE html>
<html>
<head>
  <title>Webkit</title>
  <link type="text/css" rel="stylesheet" href="/src/client/css/styles.css">
</head>
<body>
  <textarea id="code" class="CodeMirror"></textarea>
  <link rel="stylesheet" type="text/css" href="../../../node_modules/codemirror/lib/codemirror.css">
  <link rel="stylesheet" type="text/css" href="../../../node_modules/codemirror/theme/ambiance.css">
  <link rel="stylesheet" type="text/css" href="../../../node_modules/codemirror/theme/solarized.css">
  <script type="text/javascript" src="../../../node_modules/codemirror/lib/codemirror.js"></script>
  <script type="text/javascript" src="../../../node_modules/codemirror/mode/python/python.js"></script>
  <script type="text/javascript" src="../../../node_modules/codemirror/addon/edit/closebrackets.js"></script>
  <script type="text/javascript" src="../../../node_modules/codemirror/addon/edit/matchbrackets.js"></script>

  <script type="text/javascript" src="../js/index.js"></script>
  <button id="submit" onclick="Submit()">Submit!</button>

  <table class="bots" id="tableBots"></table>

</body>
</html>`

AddBots(html, ["bad dude man 1", "bad dude another man 2"]);