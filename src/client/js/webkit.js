const bots = ['Private', 'Rico', 'Skipper', 'Kowalski'];
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
        console.log('Submitted with result:', result);
    });
}

runAgainst = (botName) => {
    fetch('/run', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({
            'code': code,
            'botName': botName
        })
    }).then(result => {
        // do something with the result
        console.log('Ran against bot with result:', result);
    });
}

// todo - bots should be an argument
function addBots() {
    let m = document.getElementById('bots-menu');
    let button = document.getElementById('bots-button');
    let style = button.style;
    // if (m != null) {
    //     if (m.style['visibility'] == '') {
    //         console.log(m.style['opacity'])
    //         m.remove();
    //         // button.style['transform'] = 'rotate(0deg)';
    //         // setTimeout(() => {
    //         //     button.style = style;
    //         // }, 25);
    //         return;
    //     }
    // }
    let menu = document.createElement('div');
    menu.id = 'bots-menu';
    let nav = document.getElementsByClassName('top-section')[0];
    let code = document.getElementsByClassName('CodeMirror')[0];

    let menuStyle = `
        width: ${(code.offsetWidth + 1)}px;
        height: fit-content;
        float: left;
        /* overflow: scroll; */
        background-color: #fff;
        position: absolute;
        left: 0;
        top: ${nav.offsetHeight + 3}px;
        z-index: 100;
    `
    menu.setAttribute('style', menuStyle);

    let table = document.createElement('table');
    table.id = 'bots-table';

    let tableStyle = `
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
        margin-left: 10px;
        margin-top: ${button.offsetHeight + 10 + 4}px;
        box-sizing: content-box;
    `
    table.setAttribute('style', tableStyle);

    let r = document.createElement('tr');
    let h1 = document.createElement('th');
    let h2 = document.createElement('th');

    let h1Text = document.createTextNode('Bots');
    let h2Text = document.createTextNode('Play');
    h1.appendChild(h1Text);
    h2.appendChild(h2Text);

    r.appendChild(h1);
    r.appendChild(h2);
    table.appendChild(r)
    menu.appendChild(table);


    buttonStyle = `
        display: flex;
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 8px;
        align-self: center;
        border: none;
        border-radius: 4px;
        background-color: #EFEFEF;
        transition: 0.2s linear;
        outline: none;
        width: 73px;
        cursor: pointer;
    `
    for (bot of bots) {
        let tr = document.createElement('tr');
		
		let nametag = document.createElement('td');
		let nametext = document.createTextNode(bot);
		nametag.appendChild(nametext);

		let playtag = document.createElement('td');
		let playbutton = document.createElement('button');
		playbutton.setAttribute('class', 'play');
		playbutton.setAttribute('onclick', `runAgainst('${bot}')`);
        playbutton.textContent = 'Play Against ♛';

        playtag.appendChild(playbutton);

		tr.appendChild(nametag);
		tr.appendChild(playtag);

		table.appendChild(tr);
    }
    
    let leftPanel = document.getElementById('left-panel');
    leftPanel.appendChild(menu);
}

