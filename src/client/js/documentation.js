const methods = [{
    name: 'move', 
    arguments: 's1, s2',
    argumentsDesc: 's1 - current square, s2 - target square',
    desc: 'This is the main move function'
}];

// todo - create method object
// *todo - methods should be an argument
function createMethods(methods) {  
    teams.sort(teamsComparator);
    let nav = document.getElementsByClassName('top-section')[0];
    let leaderboard =  document.getElementById('leaderboard');

    let table = document.createElement('table');
    table.id = 'leaderboard';

    let tableStyle = `
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        border-collapse: collapse;
        box-sizing: content-box;
    `   
    table.setAttribute('style', tableStyle);

    let r = document.createElement('tr');
    let h1 = document.createElement('th');
    let h2 = document.createElement('th');
    let h3 = document.createElement('th');


    h1.setAttribute('style', 'width: 6%;');
    let h1Text = document.createTextNode(''); // maybe put #
    let h2Text = document.createTextNode('Team');
    let h3Text = document.createTextNode('Score');
    h1.appendChild(h1Text);
    h2.appendChild(h2Text);
    h3.appendChild(h3Text);

    r.appendChild(h1);
    r.appendChild(h2);
    r.appendChild(h3);
    table.appendChild(r);

    for (let i = 0; i < teams.length; i++) {
        let team = teams[i];
        let tr = document.createElement('tr');
		
		let index = document.createElement('td');
		let indexText = document.createTextNode(i + 1);
		index.appendChild(indexText);

		let name = document.createElement('td');
		let nameText = document.createTextNode(team.name);
        name.appendChild(nameText);

        let score = document.createElement('td');
		let scoreText = document.createTextNode(team.score);
        score.appendChild(scoreText);

        tr.appendChild(index);
		tr.appendChild(name);
		tr.appendChild(score);

		table.appendChild(tr);
    }

    leaderboard.appendChild(table);
}

createLeaderboard()