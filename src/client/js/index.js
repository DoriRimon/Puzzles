function login() {
    // todo - check for null
    let team = document.getElementsByClassName('signin')[0].getElementsByClassName('team');
    let password = document.getElementsByClassName('signin')[0].getElementsByClassName('password');

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
        console.log('commiTed login with result:', result);
    });
}

function sign() {
    // todo - check for null
    let team = document.getElementsByClassName('signup')[0].getElementsByClassName('team');
    let password = document.getElementsByClassName('signup')[0].getElementsByClassName('password');
    
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
        console.log('commiTed signup with result:', result);
    });
}