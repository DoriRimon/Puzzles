// TODO - Boundaries to x2 & y2
// TODO - Castling

class Piece {
    constructor(pos, color) {
        if (new.target == Piece) {
            throw new TypeError("Cannot construct abstract class");
        }
        if (this.canMove(board, sqaure) == undefined) {
            throw new TypeError("Must implement canMove method");
        }
        this.pos = pos;
        this.color = color
        this.points;
        this.name;
    }

    canMove(board, sqaure) {
        let [x2, y2] = [sqaure[0], square[1]];
        if (x2 < 0 || x2 > board.length || y2 < 0 || y2 > board.length)
            return false;
        else if (board[x2][y2] != null)
            if (board[x2][y2].constructor.name == "King")
                return false;
        return true;
    }

    move(square) {
        this.pos = square;
    }
}

class Pawn extends Piece{
    constructor(pos, color) {
        super(pos, color);
        this.name = "Pawn";
        this.points = 1;
        this.numOfMoves = 0;
    }

    canMove(board, square) {
        if (!super().canMove(board, square))
            return false
        let [x1, y1] = [pos[0], pos[1]];
        let [x2, y2] = [sqaure[0], square[1]];
        if (this.color == "white") {
            if (board[x2][y2] == null) {
                if (y2 == y1 && x2 == x1 - 1)
                    return true;
                else if (y2 == y1 && x2 == x1 - 2)
                    if (this.numOfMoves == 0 && board[x1-1][y1] == null)
                        return true
                else if ((y2 == y1 - 1 || y2 == y1 + 1) && x2 == x1 - 1) { // Eat En Passant
                    if (board[x1-1][y1] != null) {
                        if (board[x1-1][y1].constructor.name == "Pawn") {
                            if (board[x1-1][y1].numOfMoves == 0)
                                return true;
                        }
                    }
                }
                
            }
            else if ((y2 == y1 - 1 || y2 == y1 + 1) && x2 == x1 - 1) // Eat
                return true
        }
        else {
            if (board[x2][y2] == null) {
                if (y2 == y1 && x2 == x1 + 1)
                    return true;
                else if (y2 == y1 && x2 == x1 + 2)
                    if (this.numOfMoves == 0 && board[x1+1][y1] == null)
                        return true
                else if ((y2 == y1 - 1 || y2 == y1 + 1) && x2 == x1 + 1) { // Eat En Passant
                    if (board[x1+1][y1] != null) {
                        if (board[x1+1][y1].constructor.name == "Pawn") {
                            if (board[x1+1][y1].numOfMoves == 0)
                                return true;
                        }
                    }
                }
                
            }
            else if ((y2 == y1 - 1 || y2 == y1 + 1) && x2 == x1 + 1) // Eat
                return true
        }
        return false;
    }

    move(square) {
        super.move(square);
        this.numOfMoves++;
    }
}

class Rook extends Piece {
    contructor(pos, color) {
        super(pos, color);
        this.name = "Rook";
        this.points = 5;
        this.numOfMoves = 0;
    }

    camMove(board, sqaure) {
        if (!super().canMove(board, sqaure))
            return false;
        if (x2 == x1) {
            
        }
        return false;
    }
}

class Knight extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = "Knight";
        this.points = 3;
    }

    canMove(board, square) {
        if (!super().canMove(board, square))
            return false
        let [x1, y1] = [pos[0], pos[1]];
        let [x2, y2] = [sqaure[0], square[1]];
        // Might eat..
        if (x2 == x1 + 2 || x2 == x1 - 2) {
            if (y2 == y1 + 1 || y2 == y1 - 1)
                return true;
        }
        if (x2 == x1 + 1 || x2 == x1 - 1) {
            if (y2 == y1 + 2 || y2 == y1 - 2)
                return true;
        }
        return false
    }
}

class Bishop extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = "Bishop";
        this.points = 3;
    }

    canMove(board, square) {
        let [x, y] = [sqaure[0], sqaure[1]];
    }
}

class Queen extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = "Queen";
        this.points = 9;
    }
}

class King extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = "King";
        this.numOfMoves = 0;
    }
}