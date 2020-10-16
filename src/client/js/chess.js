const wR = '../img/wR.png';
const wN = '../img/wN.png';
const wB = '../img/wB.png';
const wK = '../img/wK.png';
const wQ = '../img/wQ.png';
const wP = '../img/wP.png';
const bR = '../img/bR.png';
const bN = '../img/bN.png';
const bB = '../img/bB.png';
const bK = '../img/bK.png';
const bQ = '../img/bQ.png';
const bP = '../img/bP.png';

const size = 8;
function rowToSign(row) {
    return 8 - row;
}

function colToSign(col) {
    switch (col) {
        case 0:
            return 'a';
        case 1:
            return 'b';
        case 2:
            return 'c';
        case 3:
            return 'd';
        case 4:
            return 'e';
        case 5:
            return 'f';
        case 6:
            return 'g';
        case 7:
            return 'h';
    }
}

function chessboard(id, width, state='empty') {
    let boardWidth = Math.floor((width - 4)/ 8) * 8;
    let userBoard = document.getElementById(id);

    let outerBoard = document.createElement('div');
    outerBoard.className = 'outerBoard';
    outerBoard.setAttribute('style', `width: ${boardWidth}px;height: ${boardWidth}px;`);
    
    let innerBoard = document.createElement('div');
    innerBoard.className = 'innerBoard';
    innerBoard.setAttribute('style', `width: ${boardWidth}px;height: ${boardWidth}px;`);

    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.id = 'row' + i;
        innerBoard.appendChild(row);
        for (let j = 0; j < size; j++) {
            let square = document.createElement('div');
            square.id = colToSign(j) + rowToSign(i);
            square.className = 'square';
            if ((i + j) % 2 == 0)
                square.classList.add('white');
            else
                square.classList.add('black');
            square.setAttribute('style', `width: ${boardWidth / 8}px;height: ${boardWidth / 8}px;`);
            row.appendChild(square);
        }
    }

    userBoard.appendChild(outerBoard);
    outerBoard.appendChild(innerBoard);

    if (state == 'start')
        startPosition(id);
}

function startPosition(id) {
    let board = document.getElementById(id);
    let rows = board.firstElementChild.firstElementChild.childNodes;

    let row = rows[7];
    let img;
    for (let j = 0; j < size; j++) {
        let square = row.childNodes[j];
        switch(j) {
            case 0:
            case 7:
                img = document.createElement('img');
                img.src = wR;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
            case 1:
            case 6:
                img = document.createElement('img');
                img.src = wN;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
            case 2:
            case 5:
                img = document.createElement('img');
                img.src = wB;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
            case 3:
                img = document.createElement('img');
                img.src = wQ;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
            case 4:
                img = document.createElement('img');
                img.src = wK;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
        }
    }

    row = rows[6];
    for (let j = 0; j < size; j++) {
        let square = row.childNodes[j];
        img = document.createElement('img');
        img.src = wP;
        img.setAttribute('style', 'width:80%;height:80%;')
        square.appendChild(img);
    }

    row = rows[1];
    for (let j = 0; j < size; j++) {
        let square = row.childNodes[j];
        img = document.createElement('img');
        img.src = bP;
        img.setAttribute('style', 'width:80%;height:80%;')
        square.appendChild(img);
    }

    row = rows[0];
    for (let j = 0; j < size; j++) {
        let square = row.childNodes[j];
        switch(j) {
            case 0:
            case 7:
                img = document.createElement('img');
                img.src = bR;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
            case 1:
            case 6:
                img = document.createElement('img');
                img.src = bN;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
            case 2:
            case 5:
                img = document.createElement('img');
                img.src = bB;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
            case 3:
                img = document.createElement('img');
                img.src = bQ;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
            case 4:
                img = document.createElement('img');
                img.src = bK;
                img.setAttribute('style', 'width:80%;height:80%;')
                square.appendChild(img);
                break;
        }
    }
}

function move(from, to) {
    let f = document.getElementById(from);
    let t = document.getElementById(to);
    if (f == null || t == null)
        return false;
    let fImages  = f.getElementsByTagName('img');
    if (fImages.length == 0)
        return false;
    let fImg = fImages[0];
    let tImages = t.getElementsByTagName('img');
    if (tImages.length > 0) {
        let tImg = tImages[0];
        tImg.remove();
    }
    t.appendChild(fImg);
    return true;
}
