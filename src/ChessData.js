// ChessData.js
// this class stores all the information we need to know about an
// ongoing chess game
var Chess = require("../public/lib/chess");

class ChessData {
    constructor(fen, whitePlayer, blackPlayer) {
        this.fen = fen;
        this.whitePlayer = whitePlayer;
        this.blackPlayer = blackPlayer;
    }

    // get the Chess.js object for this game
    getGame() {
        return new Chess(this.fen);
    }
} module.exports = ChessData;