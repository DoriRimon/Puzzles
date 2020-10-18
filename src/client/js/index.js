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

function login() {
    let team = document.getElementsByClassName('signin').getElementsByClassName('team');
    let password = document.getElementsByClassName('signin').getElementsByClassName('password');
    if (team.length == 0 || password.length == 0)
        return;
    team = team[0];
    passwrod = password[0];
    console.log(`login request: team - ${team}, password - ${password}`);

    fetch('/login', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({
            'team': team,
            'password': password
        })
    }).then(result => {
        // do something with the result
        console.log("commiTed login with result:", result);
    });
}

function sign() {
    let team = document.getElementsByClassName('signup').getElementsByClassName('team');
    let password = document.getElementsByClassName('signup').getElementsByClassName('password');
    if (team.length == 0 || password.length == 0)
        return;
    team = team[0];
    passwrod = password[0];
    console.log(`sign request: team - ${team}, password - ${password}`);

    fetch('/sign', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({
            'team': team,
            'password': password
        })
    }).then(result => {
        // do something with the result
        console.log("commiTed signup with result:", result);
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
