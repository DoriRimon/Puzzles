const teams = [{
    name: 'Doraz', 
    score: 100
},
{
    name: 'Ya', 
    score: 90
}, 
{
    name: 'Doraz', 
    score: 100
},
{
    name: 'Ya', 
    score: 90
},
{
    name: 'Doraz', 
    score: 100
},
{
    name: 'Ya', 
    score: 90
},
{
    name: 'Doraz', 
    score: 100
},
{
    name: 'Ya', 
    score: 90
},
{
    name: 'Doraz', 
    score: 100
},
{
    name: 'Ya', 
    score: 90
},
{
    name: 'Doraz', 
    score: 100
},
{
    name: 'Ya', 
    score: 90
},
{
    name: 'Doraz', 
    score: 100
},
{
    name: 'Ya', 
    score: 90
}];

// todo - create team object
// *todo - teams should be an argument
// receives teams (list of Team objects) by descending order 
function creaetLeaderboard() {  
    let nav = document.getElementsByClassName('top-section')[0];
    let leaderboard =  document.getElementById('leaderboard');

    let table = document.createElement('table');
    table.id = 'leaderboard';

    let tableStyle = `
        table-layout: fixed;
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


    let h2Text = document.createTextNode('Teams');
    let h3Text = document.createTextNode('Score');
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

creaetLeaderboard()