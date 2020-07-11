// chesboard.js
// handle all the web requests for chess games
var ChessData = require('./ChessData');

// the FEN notation for a starting position
const STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";


module.exports = (app, database) => {
    // this is run when oururl.com/api/chessgame gets a POST request
    // it will create a chess game in our database
    app.post('/api/chessgame/', (req, res) => {
        // check if the game has a white and black player
        var gamehasPlayers = 
            req.body['whitePlayer'] != null &&
            req.body['blackPlayer'] != null
        
        // if the game does not have players,
        // send an error back
        if (!gamehasPlayers) {
            res.status(400); // 400 = bad request
            res.send("A 'whitePlayer' and 'blackPlayer' must be specified in request.");
        } else {
            // generate a random game id
            var randID = Math.random().toString(36).substr(2, 9);

            // store game in database at id
            database[randID] = new ChessData(STARTING_POSITION, req.body['whitePlayer'], req.body['blackPlayer']);

            // tell the user the ID of their new game
            res.send(randID);
        }
    });

    app.get('/api/chessgame' , (req, res)=> {
        if(! req.query.gameID) {
            res.status(404)
            res.send('Not Avalible')
            return 
        }

        var sendGame = database[ req.query.gameID ]
        if(sendGame == undefined) {
            res.status(404)
            res.send('Game Invalid')
            
        } else {
            res.send(sendGame)
        }
    
    })

    // this route is used to make moves on the chessboard
    // TODO check if the move is legal
    app.post('/api/chessgame/move', (req, res) => {
        var requestIsValid =
            req.body['game'] != null &&
            req.body['move'] != null &&
            req.body['movingPlayer'] != null;

        // send an error if the request is invalid
        if (!requestIsValid) {
            res.status(400);
            return res.send("Request is invalid.");
        }

        // check if the game exists
        if (!database[req.body['game']]) {
            res.status(404); // 404 = not found
            return res.send("Game '" + req.body['game'] + "' was on found on the server.");
        }

        // make the move
        // TODO check if move is valid
        // TODO check if move is check
        // TODO ccheck if move is checkmate

        // make the move in memory
        console.log(database[req.body['game']])
        var chessGame = database[req.body['game']].getGame();
        chessGame.move(req.body['move']);

        // update the fen string stored
        database[req.body['game']].fen = chessGame.fen();

        // finish the session
        res.send("Move made");
    });
}