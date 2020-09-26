const express = require('express');
const socket = express();
const port = 3000;
const HTMLParser = require("jsdom");
const fs = require('fs');
const path = require("path");
const bodyParser = require("body-parser")
const JSONParser = bodyParser.json();
const mongoClient = require('mongodb').MongoClient;

const MONGO_URL = "mongodb://localhost:27017/";

let db;
let index_html = "";

ConnectMongo();

fs.readFile("src/client/html/index.html", (err, content) => {
	if (err) {
		console.log("error when reading data.json:\n" + err);
		process.exit(1);
	}
	else {
		try {
			index_html = AddBots(content, ["Skipper", "Rico"]);
		}
		catch (e) {
			console.log("error when parsing data.json:\n" + e);
			process.exit(1);
		}
	}
});

socket.use(JSONParser);
socket.use('/node_modules', express.static(path.join(__dirname, '../../../node_modules')))
socket.use('/src/client', express.static(path.join(__dirname, '../../client')))

socket.get('/', (req, res) => {
	console.log(index_html);
	res.send(index_html);
});

// Submit code (Save it)
socket.post('/submit', (req,res) => {
	group = req.body["group"];
	sender = req.body["sender"];
	date = req.body["date"];
	code = req.body["code"];

	// Save the code
	UploadCode(group, sender, date, code);

	// Return a response (TCP Protocol)
	res.json(req.body);
});
	
socket.listen(port, () => {
	console.log(`Webkit listening at http://localhost:${port}`);
});

fs.readFile("src/client/html/index.html", 'utf8', (err, content) => {
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


function ConnectMongo() {
	mongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, function(err, database) {
		if (err)
			throw err;
		console.log("Database Connected!");
		db = database.db("mydb");

		db.collection("codes", (err, lst) => {
			if (err)
				throw err;
			console.log("Collection codes found.");
		})
	});
}

function CloseConnection() {
	db.close();
}

function UploadCode(group, sender, date, code) {
	let uploadObj = {}
	uploadObj[group] = {
		sender: sender,
		date: date,
		code: code
	}

	let singleUpload = {
		sender: sender,
		date: date, 
		code: code
	}

	db.collection("codes").insertOne(uploadObj, (err, res) => {
		if (err)
			throw err;
		console.log(`Inserted Code From ${sender}\n\n`);
	});
}

function AddBots(html, bots) {
	const dom = new HTMLParser.JSDOM(html);
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