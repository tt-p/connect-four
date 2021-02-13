class ConnectN {

    constructor(selector, width, height) {
        this.selector = selector;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.gameState = new GameState(width, height);
        this.gameBoard = new GameBoard(selector, width, height);
        this.players = [];
        this.players[Game.PLAYER_ONE] = PlayerType.Human;
        this.players[Game.PLAYER_TWO] = PlayerType.Human;
        this.stopped = true;
        this.over = false;
    }

    Action(type, player) {
        var action = -1;
        switch(type) {
            case PlayerType.Human:
                if (this.gameBoard.humanAction != -1 && this.gameState.IsLegalAction(this.gameBoard.humanAction)) {
                    action = this.gameBoard.humanAction; 
                    this.gameBoard.humanAction = -1;
                }
                break;
            case PlayerType.Minimax:
                var minimax = new Minimax(Evaluation.Counter, this.gameState, SearchDepth[player]);         
                action = minimax.GetAction();
                break;
            case PlayerType.AlphaBeta:
                var alphabeta = new AlphaBeta(Evaluation.Counter, this.gameState, SearchDepth[player])
                action = alphabeta.GetAction();
                break;
            case PlayerType.IDAlphaBeta:
                var idAlphabeta = new IDAlphaBeta(Evaluation.Counter, this.gameState, SearchDepth[player])
                action = idAlphabeta.GetAction();
                break;
            case PlayerType.Random:
                const actions = this.gameState.GetLegalActions();
                const rnd = parseInt(Math.random()*actions.length-1)
                action = actions[rnd];
                break;
        }
        if (action != -1) {
            this.gameState.DoAction(action);
            const last = this.gameState.actionHist[this.gameState.actionHist.length-1];
            this.gameBoard.DrawAction(last[0], last[1]);
        }
    }

    Start() {
        this.over = false;
        this.stopped = false;
        this.gameBoard.input = true;
    }

    Update() {
        if (this.over || this.stopped) { return; }
        this.gameBoard.input =
        this.players[Game.PLAYER_ONE] == PlayerType.Human || this.players[Game.PLAYER_TWO] == PlayerType.Human;
        const result = this.gameState.GetWinner();
        if (result == Game.NONE) {
            this.ChangeInfo(this.gameState.player);
            this.Action(this.players[this.gameState.player], this.gameState.player);
        }
        else {
            this.GameOver(result);
        }
    }

    Stop() {
        this.stopped = true;
        this.gameBoard.input = false;       
    }

    Restart() {
        this.gameState = new GameState(this.WIDTH, this.HEIGHT);
        this.gameBoard.ClearBoard();
        this.Start();
    }

    Undo() {
        if (this.gameState.actionHist.length > 0) {
            const last = this.gameState.actionHist[this.gameState.actionHist.length-1];
            this.gameBoard.EraseAction(last[0], last[1]);
            this.gameState.UndoAction();
            if (this.over) {
                this.over = false;
                this.gameBoard.input = true;
            }
        }
    }

    ChangeInfo(player) {
        const $info = $('#info');
        var str = "";
        switch(player) {
            case Game.PLAYER_ONE:
                str = "It's Player One's turn!"
                $info.removeClass('alert-warning');
                $info.addClass('alert-danger');
                break;
            case Game.PLAYER_TWO:
                str = "It's Player Two's turn!"
                $info.removeClass('alert-danger');
                $info.addClass('alert-warning');
                break;
        }       
        $info.text(str);
    }

    GameOver(result) {
        const $info = $('#info');
        $info.removeClass('alert-danger');
        $info.removeClass('alert-warning');
        $info.removeClass('alert-primary');
        var str = "";
        switch(result) {
            case Game.PLAYER_ONE:
                str = "Player One has won!"
                $info.addClass('alert-danger');
                break;
            case Game.PLAYER_TWO:
                str = "Player Two has won!"
                $info.addClass('alert-warning');
                break;
            case Game.DRAW:
                str = "It is a draw!"
                $info.addClass('alert-primary');
                break;
        }
        $info.text(str);
        this.gameBoard.input = false;
        this.over = true;
    }
}