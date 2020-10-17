import {colors, pieces} from '../../shared/constants.js'

class Game {
    constructor() {
        let player1 = new Player(colors.white);
        let player2 = new Player(colors.black);
        this.self = player1;
        this.rival = player2;

        this.board = new Array(8);
        for (let i = 0; i < this.board.length; i++){
            board[i] = new Array(8);
            for (let k = 0; k < board[i].length; k++)
                board[i][k] = null
        }
    }

    getSelf() {
        return this.self;
    }

    getRival() {
        return this.rival;
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
        return this.getMyInstruments(pieces.pawn);
    }

    getMyRooks() {
        return this.getMyInstruments(pieces.rook);
    }

    getMyKnights() {
        return this.getMyInstruments(pieces.knight);
    }

    getMyBishops() {
        return this.getMyInstruments(pieces.bishop);
    }

    getMyQueen() {
        return this.getMyInstruments(pieces.queen);
    }

    getMyKing() {
        return this.getMyInstruments(pieces.king);
    }

    getMyPieces() {
        let pieces = [];
        let keys = Object.keys(this.mySelf.pieces);
        keys.forEach(function(key) {
            pieces.push(this.mySelf.pieces[key]);
        });
        return pieces;
    }

    getRivalInstruments(name) { // Helping method
        let pieces = [];
        let keys = Object.keys(this.rival.pieces);
        keys.forEach(function(key) {
            p = this.rival.pieces[key];
            if (p.name == name)
                pieces.push(p);
        });
        if (pieces.length == 1)
            return pieces[0];
        return pieces;
    }

    getRivalPawns() {
        return this.getOponnentsInstruments(pieces.pwn);
    }

    getRivalRooks() {
        return this.getOponnentsInstruments(pieces.rook);
    }

    getRivalKnights() {
        return this.getOponnentsInstruments(pieces.knight);
    }

    getRivalBishops() {
        return this.getOponnentsInstruments(pieces.bishop);
    }

    getRivalQueen() {
        return this.getOponnentsInstruments(pieces.queen);
    }

    getRivalKing() {
        return this.getOponnentsInstruments(pieces.king);
    }

    getRivalPieces() {
        let pieces = [];
        let keys = Object.keys(this.rival.pieces);
        keys.forEach(function(key) {
            pieces.push(this.rival.pieces[key]);
        });
        return pieces;
    }

    getMyScore() { // Sum of scores of pieces I've eaten
        sum = 0;
        for (p of this.getRivalPieces()) {
            if (p.isEaten)
                sum += p.score;
        }
        return sum;
    }

    getRivalcore() {
        sum = 0;
        for (p of this.getMyInstruments()) {
            if (p.isEaten) 
                sum += p.score;
        }
        return sum;
    }

    run() {
        let turn = 0;
        let moveTime = 0;

        if (turn % 2 == 0) {
            this.self = player1;
            this.rival = player2;
        }
        else {
            this.self = player2;
            this.rival = player1;
        }

        // self.move() as thread..
        // if too long:
        //     RE
    }
}