class Player {
    constructor(color) {
        this.color = color;
        this.pieces = {};

        let first = 7;
        let second = 6;
        if (color == "black") {
            first = 0;
            second = 1;
        }
        for (let i = 0; i < 8; i++) {
            this.pieces[`pawn${i+1}`] = new Pawn([second, i], color);
        }
        this.pieces[`rook1`] = new Rook([first, 0], color);
        this.pieces[`rook2`] = new Rook([first, 7], color);
        this.pieces[`knight1`] = new Knight([first, 1], color);
        this.pieces[`knight2`] = new Knight([first, 6], color);
        this.pieces[`bishop1`] = new Bishop([first, 2], color);
        this.pieces[`bishop2`] = new Bishop([first, 5], color);
        this.pieces[`queen`] = new Queen([first, 3], color);
        this.pieces[`king`] = new King([first, 4], color);
    }

    canMove(opponent, piece, board, square) {
        let p = pieces[piece];
        kingSquare = pieces["king"].square;
        if (!p.canMove(board, square))
            return false;
        let flag = false; // Is king threatened
        let keys = Object.keys(opponent.pieces);
        let vals = [];
        keys.forEach(function(key) {
            vals.push(opponent.pieces[key]);
        });
        for (op of vals) {
            if (op.canThreat(board, kingSquare))
                flag = true;
        }
        if (flag && piece != "king")
            return false;
        return true;
    }

    isWin(opponent, piece, board) {
        let [x1, y1] = [piece.square[0], piece.square[1]];
        let king = opponent.pieces["king"];
        let threatened = false;
        let blocked = true;
        let keys = Object.keys(pieces);
        let vals = [];
        keys.forEach(function(key) {
            vals.push(pieces[key]);
        });
        for (p of vals) {
            if (p.canThreat(board, king.square))
                threatened = true;
                break;
        }
        if (threatended) {
            for (let i = 0; i < 9; i++) {
                if (i == 4)
                    continue;
                let y2 = y1 - 1 + (i % 3);
                let x2 = x1 - 1;
                if (i >= 3)
                    x2++;
                if (i >= 6)
                    x2++;
                if (x2 >= 0 && x2 < board.length && y2 >= 0 && y2 < board.length) {
                    let flag = false;
                    for (p of vals) {
                        if (p.canThreat(board, [x2, y2]))
                            flag = true;
                            break;
                    }
                    if (!flag)
                        blocked = false;
                }
            }
            if (blocked)
                return true;
        }
        return false;
    }
}