const express = require('express');
const socket = express();
const port = 3000;
const parser = require("jsdom");
const fs = require('fs');
var index_html = "";

socket.use("/", express.static(__dirname));

socket.get('/', (req, res) => {
	res.send(index_html)
});
	
socket.listen(port, () => {
	console.log(`Webkit listening at http://localhost:${port}`);
});

fs.readFile("src/client/html/index.html", (err, content) => {
	if (err) {
		console.log("error when reading data.json:\n" + err);
		process.exit(1);
	}
	else {
		try {
			index_html = AddBots(content, ["bad dude man 1", "bad dude another man 2"]);
		}
		catch (e) {
			console.log("error when parsing data.json:\n" + e);
			process.exit(1);
		}
	}
});


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