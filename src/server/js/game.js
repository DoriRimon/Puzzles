import {colors, pieces} from '../../shared/constants.js'

class Game {
    constructor() {
        let player1 = new Player(colors.white);
        let player2 = new Player(colors.black);
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
        return this.getOponnentsInstruments(pieces.pwn);
    }

    getOpponentsRooks() {
        return this.getOponnentsInstruments(pieces.rook);
    }

    getOpponentsKnights() {
        return this.getOponnentsInstruments(pieces.knight);
    }

    getOponnentsBishops() {
        return this.getOponnentsInstruments(pieces.bishop);
    }

    getOponnentsQueen() {
        return this.getOponnentsInstruments(pieces.queen);
    }

    getOponnentsKing() {
        return this.getOponnentsInstruments(pieces.king);
    }

    getOponnentsPieces() {
        let pieces = [];
        let keys = Object.keys(this.opponent.pieces);
        keys.forEach(function(key) {
            pieces.push(this.opponent.pieces[key]);
        });
        return pieces;
    }

    getMyScore() { // Sum of scores of pieces I've eaten
        sum = 0;
        for (p of this.getOponnentsPieces()) {
            if (p.isEaten)
                sum += p.score;
        }
        return sum;
    }

    getOpponentScore() {
        sum = 0;
        for (p of this.getMyInstruments()) {
            if (p.isEaten) 
                sum += p.score;
        }
        return sum;
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