const express = require('express');
const socket = express();
const port = 3000;
const HTMLParser = require("jsdom");
const fs = require('fs');
const path = require("path");
const JSONParser = require("body-parser").json();
const mongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/";

import getCode from "./codes.js";
import run from "./run.js";

let db;
let index_html = "";

ConnectMongo();

socket.use(JSONParser);
socket.use('/node_modules', express.static(path.join(__dirname, '../../../node_modules')))
socket.use('/src/client', express.static(path.join(__dirname, '../../client')))

socket.get('/', (req, res) => {
	res.send(index_html);
});

// Submit code (Save it)
socket.post('/submit', (req, res) => {
	group = req.body["group"];
	sender = req.body["sender"];
	date = req.body["date"];
	code = req.body["code"];

	// Save the code
	uploadCode(group, sender, date, code);

	// Return a response (TCP Protocol)
	res.json(req.body);
});

// Run Code vs Bot
socket.post('/run', (req, res) => {
	code = req.body["code"];
	botName = req.body["botName"];

	botCode = getCode(botName);

	gameResult = run(code, botCode);

	// Find a way to send gameResult

	// Return a response (TCP Protocol)
	res.json(req.body);
});

// Commit Login
socket.post('/login', (req, res) => {
	team = req.body['team'];
	password = req.body['password'];

	// Verify account
	flag = verifyAccount(team, password);

	// Return a response (TCP Protocol)
	res.json(flag);
});

// Commit SignUp
socket.post('/sign', (req, res) => {
	team = req.body['team'];
	password = req.body['password'];

	// Create account
	flag = createAccount(team, password);

	// Return a response (TCP Protocol)
	res.json();
});
	
socket.listen(port, () => {
	console.log(`Webkit listening at http://localhost:${port}`);
});

fs.readFile("src/client/html/index.html", 'utf8', (err, content) => {
	if (err) {
		console.log("error when reading index.html:\n" + err);
		process.exit(1);
	}
	else {
		try {
			index_html = addBots(content, ["Skipper", "Rico"]);
		}
		catch (e) {
			console.log("error when parsing index.html:\n" + e);
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

		db.createCollection("codes", function(err, res) {
			if (err)
				throw err;
			console.log("Collection created");
		});
	});
}

function CloseConnection() {
	db.close();
}

function createAccount(team, password) {
	let uploadObj = {};
	uploadObj[team] = {
		password: password
	}

	db.collection("teams").insertOne(uploadObj, (err, res) => {
		if (err)
			throw err;
		console.log(`The team ${team} was created`)
	});
}

function verifyAccount(team, password) {
	let t = db.collection('teams').find()[team];
	if (t.length == 0)
		return false
	if (password == t[password])
		return true;
	return false;
}

function uploadCode(group, sender, date, code) {
	let uploadObj = {};
	uploadObj[group] = {
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

function addBots(html, bots) {
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