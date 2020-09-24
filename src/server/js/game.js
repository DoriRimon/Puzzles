class Game {
    constructor() {
        let player1 = new Player("white");
        let player2 = new Player("black");
        this.mySelf = player1;
        this.opponent = player2;

        this.board = new Array(8);
        for (let i = 0; i < this.board.length; i++){
            board[i] = new Array(8);
            for (let k = 0; k < board[i].length; k++)
                board[i][k] = null
        }
    }

    getMySelf() {
        return this.mySelf;
    }

    getOpponent() {
        return this.opponent;
    }

    getMyInstruments(name) { // Helping method
        let pieces = [];
        let keys = Object.keys(this.mySelf.pieces);
        keys.forEach(function(key) {
            p = this.mySelf.pieces[key];
            if (p.name == name)
                pieces.push(p);
        });
        if (pieces.length == 1)
            return pieces[0];
        return pieces;
    }

    getMyPawns() {
        return this.getMyInstruments("Pawn");
    }

    getMyRooks() {
        return this.getMyInstruments("Rook");
    }

    getMyKnights() {
        return this.getMyInstruments("Knight");
    }

    getMyBishops() {
        return this.getMyInstruments("Bishop");
    }

    getMyQueen() {
        return this.getMyInstruments("Queen");
    }

    getMyKing() {
        return this.getMyInstruments("King");
    }

    getMyPieces() {
        let pieces = [];
        let keys = Object.keys(this.mySelf.pieces);
        keys.forEach(function(key) {
            pieces.push(this.mySelf.pieces[key]);
        });
        return pieces;
    }

    getOponnentsInstruments(name) { // Helping method
        let pieces = [];
        let keys = Object.keys(this.opponent.pieces);
        keys.forEach(function(key) {
            p = this.opponent.pieces[key];
            if (p.name == name)
                pieces.push(p);
        });
        if (pieces.length == 1)
            return pieces[0];
        return pieces;
    }

    getOpponentsPawns() {
        return this.getOponnentsInstruments("Pawn");
    }

    getOpponentsRooks() {
        return this.getOponnentsInstruments("Rook");
    }

    getOpponentsKnights() {
        return this.getOponnentsInstruments("Knight");
    }

    getOponnentsBishops() {
        return this.getOponnentsInstruments("Bishop");
    }

    getOponnentsQueen() {
        return this.getOponnentsInstruments("Queen");
    }

    getOponnentsKing() {
        return this.getOponnentsInstruments("King");
    }

    getOponnentsPieces() {
        let pieces = [];
        let keys = Object.keys(this.opponent.pieces);
        keys.forEach(function(key) {
            pieces.push(this.opponent.pieces[key]);
        });
        return pieces;
    }

    run() {
        let turn = 0;


        if (turn % 2 == 0) {
            this.mySelf = player1;
            this.opponent = player2;
        }
        else {
            this.mySelf = player2;
            this.opponent = player1;
        }
    }



}