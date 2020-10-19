import {colors, pieces} from '../../shared/constants.js'

class Piece {
    constructor(pos, color, id) {
        if (new.target == Piece)
            throw new TypeError('Cannot construct abstract class');
        if (this.canMove(board, sqaure) == undefined)
            throw new TypeError('Must implement canMove method');
        this.pos = pos;
        this.color = color
        this.points;
        this.name;
        this.id = id;
        this.isEaten;
    }

    canMove(board, sqaure) {
        let [x2, y2] = [sqaure[0], square[1]];
        if (x2 < 0 || x2 > board.length || y2 < 0 || y2 > board.length) // Out of scope
            return false;
        else if (board[x2][y2] != null)
            if (board[x2][y2].constructor.name == pieces.king) // Trying to Eat a king
                return false;
        if (x2 == x1 && y2 == y1) // Trying not to move
            return false;
        return true;
    }

    move(square) {
        this.pos = square;
    }
}

class Pawn extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = pieces.pawn;
        this.points = 1;
        this.numOfMoves = 0;
    }

    canMove(board, square) {
        if (!super().canMove(board, square))
            return false
        let [x1, y1] = [pos[0], pos[1]];
        let [x2, y2] = [sqaure[0], square[1]];
        if (this.color == colors.white) {
            if (board[x2][y2] == null) {
                if (y2 == y1 && x2 == x1 - 1)
                    return true;
                else if (y2 == y1 && x2 == x1 - 2)
                    if (this.numOfMoves == 0 && board[x1-1][y1] == null)
                        return true
                else if ((y2 == y1 - 1 || y2 == y1 + 1) && x2 == x1 - 1) { // Eat En Passant
                    if (board[x2][y2] == null && board[x1][y2] != null) {
                        if (board[x1][y2].constructor.name == pieces.pawn) {
                            if (board[x1][y2].numOfMoves == 0)
                                return true;
                        }
                    }
                }
                
            }
            else if ((y2 == y1 - 1 || y2 == y1 + 1) && x2 == x1 - 1) // Eat
                return true;
        }
        else {
            if (board[x2][y2] == null) {
                if (y2 == y1 && x2 == x1 + 1)
                    return true;
                else if (y2 == y1 && x2 == x1 + 2)
                    if (this.numOfMoves == 0 && board[x1+1][y1] == null)
                        return true
                else if ((y2 == y1 - 1 || y2 == y1 + 1) && x2 == x1 + 1) { // Eat En Passant
                    if (board[x2][y2] == null && board[x1][y2] != null) {
                        if (board[x1][y2].constructor.name == pieces.pawn) {
                            if (board[x1][y2].numOfMoves == 0)
                                return true;
                        }
                    }
                }
                
            }
            else if ((y2 == y1 - 1 || y2 == y1 + 1) && x2 == x1 + 1) // Eat
                return true;
        }
        return false;
    }

    canThreat(board, square) {
        let [x1, y1] = [pos[0], pos[1]];
        let [x2, y2] = [sqaure[0], square[1]];
        if (this.canMove(board, square) && y2 != y1)
            return true;
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
        this.name = pieces.rook;
        this.points = 5;
        this.numOfMoves = 0;
    }

    camMove(board, sqaure) {
        if (!super().canMove(board, sqaure))
            return false;
        if (this.canMoveByCastle(board, square))
            return true;
        let [x1, y1] = [pos[0], pos[1]];
        let [x2, y2] = [sqaure[0], square[1]];
        if (x2 == x1) {
            if (y2 < y1) {
                while (y2 < y1) {
                    if (board[x2][y2] != null)
                        return false;
                    y2++;
                }
            }
            else {
                while (y1 < y2) {
                    if (board[x2][y2] != null)
                        return false;
                    y2--;
                }
            }
        }
        else if (y2 == y1) {
            if (x2 < x1) {
                while (x2 < x1) {
                    if (board[x2][y2] != null)
                        return false;
                    x2++;
                }
            }
            else {
                while (x1 < x2) {
                    if (board[x2][y2] != null)
                        return false;
                    x2--;
                }
            }
        }
        return true;
    }

    canMoveByCastle(board, enemies, king) {
        if ((this.color == colors.white && this.square[1] < king.square[1]) || (this.color == colors.black && this.square[1] > king.square[1]))
                return king.canCastleLeft(board, enemies, this);
        else
            return king.canCastleRight(board, enemies, this);
    }

    canThreat(board, square) {
        if (this.canMove(board, square))
            return true;
        return false;
    }

    move(square) {
        super.move(square);
        this.numOfMoves++;
    }
}

class Knight extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = pieces.knight;
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

    canThreat(board, square) {
        return this.canMove(board, square);
    }
}

class Bishop extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = pieces.bishop;
        this.points = 3;
    }

    canMove(board, square) {
        if (!super().canMove(board, sqaure))
            return false;
        let [x1, y1] = [pos[0], pos[1]];
        let [x2, y2] = [sqaure[0], square[1]];
        if (x2 < x1 && y2 < y1 && x1 - x2 == y1 - y2) {
            while (x2 < x1 && y2 < y1) {
                if (board[x2][y2] != null)
                    return false
                x2++;
                y2++
            }
            return true
        }
        else if (x1 < x2 && y1 < y2 && x2 - x1 == y2 - y1) {
            while (x1 < x2 && y1 < y2) {
                if (board[x2][y2] != null)
                    return false
                x2--;
                y2--;
            }
            return true
        }
        return false
    }

    canThreat(board, square) {
        return this.canMove(board, square);
    }
}

class Queen extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = pieces.queen;
        this.points = 9;
    }

    canMove(board, square) {
        if (!super().canMove(board, square))
            return false;
        let [x1, y1] = [pos[0], pos[1]];
        rook = new Rook([x1, y1], this.color);
        bishop = new Book([x1, y1], this.color);
        if (rook.canMove(board, square) && bishop.canMove(board, square))
            return true;
        return false;
    }

    canThreat(board, square) {
        return this.canMove(board, square);
    }
}

class King extends Piece {
    constructor(pos, color) {
        super(pos, color);
        this.name = pieces.king;
        this.numOfMoves = 0;
    }

    canMove(board, square, enemies) {
        if (!super().canMove(board, square))
            return false;
        let [x1, y1] = [pos[0], pos[1]];
        let [x2, y2] = [sqaure[0], square[1]];
        for (enemy of enemies) {
            if (enemy.canThreat(board, square))
                return false
        }
        if (Math.abs(x2 - x1) == 1 && Math.abs(y2 - y1) == 1)
            return true;
         return false;
    }

    canThreat(board, square) {
        if (this.canMove(board, square) && Math.abs(x2 - x1) == 1 && Math.abs(y2 - y1) == 1)
            return true;
        return false;
    }

    
    isChecked(board, enemies) {
        for (enemy of enemies) {
            if (enemy.canThreat(board, this.square))
                return true;
        }
        return false;
    }

    canCastleRight(board, enemies, rightRook) {
        if (!this.isChecked(board, enemies) && rightRook.numOfMoves == 0 && this.numOfMoves == 0) {
            if (this.color == colors.white) {
                for (let i = 0; i < 2; i++) {
                    if (board[7, 4 + i] != null)
                        return false;
                    for (enemy of enemies) {
                        if (enemy.canThreat(board, [7, 4 + i]))
                            return false;
                    }
                }
                return true;
            }
            else {
                for (let i = 0; i < 3; i++) {
                    if (board[0, i + 1] != null)
                        return false;
                    for (enemy of enemies) {
                        if (enemy.canThreat(board, [0, i + 1]))
                            return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    canCastleLeft(board, enemies, leftRook) {
        if (!this.isChecked(board, enemies) && leftRook.numOfMoves == 0 && this.numOfMoves == 0) {
            if (this.color == colors.white) {
                for (let i = 0; i < 3; i++) {
                    if (board[7, i +1] != null)
                        return false;
                    for (enemy of enemies) {
                        if (enemy.canThreat(board, [7, i + 1]))
                            return false;
                    }
                    return true;
                }
            }
            else {
                for (let i = 0; i < 2; i++) {
                    if (board[0, 4 + i] != null)
                        return false;
                    for (enemy of enemies) {
                        if (enemy.canThreat(board, [0, 4 + i]))
                            return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    canCastle(board) {
        return this.canCastleLeft(board) || this.canCastleRight(board);
    }

    move(square) {
        super.move(square);
        this.numOfMoves++;
    }
}