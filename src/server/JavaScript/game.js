class Game {
    constructor() {
        this.whitePieces = [];
        this.blackPieces = [];
        this.board = new Array(8);
        for (let i = 0; i < this.board.length; i++){
            board[i] = new Array(8);
            for (let k = 0; k < board[i].length; k++)
                board[i][k] = null
        }

        for (let index in board) {
            this.whitePieces.push(new Pawn())
            this.blackPieces.push(new Pawn())
        }

        this.whitePieces.push(new Knight())
        this.whitePieces.push(new Knight())
        this.whitePieces.push(new Bishop())
        this.whitePieces.push(new Bishop())
        this.whitePieces.push(new Queen())
        this.whitePieces.push(new King())

        this.whitePieces.push(new Knight())
        this.whitePieces.push(new Knight())
        this.whitePieces.push(new Bishop())
        this.whitePieces.push(new Bishop())
        this.whitePieces.push(new Queen())
        this.whitePieces.push(new King())
    }
}