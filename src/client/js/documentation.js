// todo - create properties part as well

const methods = [{
    name: 'move', 
    args: 's1, s2',
    argsDesc: 's1 - current square, s2 - target square',
    desc: 'moves pieces from s1 to s2'
},
{
    name: 'canMove', 
    args: 's',
    argsDesc: 's - target square',
    desc: 'returns true iff piece can move to square s'
}];

// todo - create method object
// *todo - methods should be an argument
function createMethods() {  
    let nav = document.getElementsByClassName('top-section')[0];
    let methodsDiv =  document.getElementById('methods-div');

    let table = document.createElement('table');
    table.id = 'methods';

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


    h1.setAttribute('style', 'width: 15%;');
    h2.setAttribute('style', 'width: 40%;');

    let h1Text = document.createTextNode('Method'); // maybe put #
    let h2Text = document.createTextNode('Arguments');
    let h3Text = document.createTextNode('Description');
    h1.appendChild(h1Text);
    h2.appendChild(h2Text);
    h3.appendChild(h3Text);

    r.appendChild(h1);
    r.appendChild(h2);
    r.appendChild(h3);
    table.appendChild(r);

    for (let i = 0; i < methods.length; i++) {
        let method = methods[i];
        let tr = document.createElement('tr');
		
		let name = document.createElement('td');
		let nameText = document.createTextNode(method.name);
		name.appendChild(nameText);

		let args = document.createElement('td');
		let argsText = document.createTextNode(`${method.args}: ${method.argsDesc}`);
        args.appendChild(argsText);

        let desc = document.createElement('td');
		let descText = document.createTextNode(method.desc);
        desc.appendChild(descText);

        tr.appendChild(name);
		tr.appendChild(args);
		tr.appendChild(desc);

		table.appendChild(tr);
    }

    methodsDiv.appendChild(table);
}

createMethods()