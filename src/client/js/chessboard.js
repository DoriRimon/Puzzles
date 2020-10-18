const size = 8;
const wR = '../img/themes/white-red-light/wR.png';
const wN = '../img/themes/white-red-light/wN.png';
const wB = '../img/themes/white-red-light/wB.png';
const wK = '../img/themes/white-red-light/wK.png';
const wQ = '../img/themes/white-red-light/wQ.png';
const wP = '../img/themes/white-red-light/wP.png';
const bR = '../img/themes/white-red-light/bR.png';
const bN = '../img/themes/white-red-light/bN.png';
const bB = '../img/themes/white-red-light/bB.png';
const bK = '../img/themes/white-red-light/bK.png';
const bQ = '../img/themes/white-red-light/bQ.png';
const bP = '../img/themes/white-red-light/bP.png';
const pieceStyle = 'width:92%;height:92%;';

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
    let boardWidth = Math.floor(width/ 8) * 8;
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
    for (let j = 0; j < size; j++) {
        let square = row.childNodes[j];
        switch(j) {
            case 0:
            case 7:
                addPiece(square, wR);
                break;
            case 1:
            case 6:
                addPiece(square, wN);
                break;
            case 2:
            case 5:
                addPiece(square, wB);
                break;
            case 3:
                addPiece(square, wQ);
                break;
            case 4:
                addPiece(square, wK);
                break;
        }
    }

    row = rows[6];
    for (let j = 0; j < size; j++) {
        let square = row.childNodes[j];
        addPiece(square, wP);
    }

    row = rows[1];
    for (let j = 0; j < size; j++) {
        let square = row.childNodes[j];
        addPiece(square, bP);
    }

    row = rows[0];
    for (let j = 0; j < size; j++) {
        let square = row.childNodes[j];
        switch(j) {
            case 0:
            case 7:
                addPiece(square, bR);
                break;
            case 1:
            case 6:
                addPiece(square, bN);
                break;
            case 2:
            case 5:
                addPiece(square, bB);
                break;
            case 3:
                addPiece(square, bQ);
                break;
            case 4:
                addPiece(square, bK);
                break;
        }
    }
}

function addPiece(square, src) {
    let img = document.createElement('img');
    img.src = src;
    img.setAttribute('style', pieceStyle)
    square.appendChild(img);
}

function move(from, to) {
    let f = document.getElementById(from);
    let t = document.getElementById(to);
    if (f == null || t == null)
        return false;
    
    let fImages  = f.getElementsByTagName('img');
    if (fImages.length == 0)
        return false;

    // let xT = t.offsetLeft;
    // let yT = t.offsetTop;
    // let xF = f.offsetLeft;
    // let yF = f.offsetTop;

    let fImg = fImages[0];
    // let board = f.parentElement.parentElement;
    // board.appendChild(fImg);

    // fImg.style.left = xF + 'px';
    // fImg.style.top = yF + 'px';

    // fImg.style.left = xT + 'px';
    // fImg.style.top = yT + 'px';

    let tImages = t.getElementsByTagName('img');
    if (tImages.length > 0) {
        let tImg = tImages[0];
        tImg.remove();
    }
    t.appendChild(fImg);
    return true;
}
