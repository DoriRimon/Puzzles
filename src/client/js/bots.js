function addBots(html, bots) {
	const document = dom.window.document;

	bots.forEach(botName => {
		let tr = document.createElement('tr');
		
		let nametag = document.createElement('td');
		let nametext = document.createTextNode(botName);
		nametag.appendChild(nametext);

		let playtag = document.createElement('td');
		let playbutton = document.createElement('button');
		playbutton.setAttribute('class', 'play');
		playbutton.setAttribute('onclick', `runAgainst('${botName}')`);
		playbutton.textContent = 'Play Against';
		playtag.appendChild(playbutton);

		tr.appendChild(nametag);
		tr.appendChild(playtag);

		let table = document.getElementById('tableBots');
		table.appendChild(tr);
	});

	html = document.documentElement.innerHTML;
	return html;
}