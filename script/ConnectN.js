class ConnectN {

    constructor(selector, width, height) {
        this.selector = selector;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.gameState = new GameState(width, height);
        this.gameBoard = new GameBoard('#gameboard', width, height);
        this.over = false;
    }

    GetHumanAction() {
        if (this.gameBoard.humanAction != -1 && this.gameState.IsLegalAction(this.gameBoard.humanAction)) {
            this.gameState.DoAction(this.gameBoard.humanAction);
            this.gameBoard.player = this.gameState.player;
            const last = this.gameState.actionHist[this.gameState.actionHist.length-1];
            this.gameBoard.DrawAction(last[0], last[1], last[2]);
            this.gameBoard.humanAction = -1;
        }
    }

    Start() {
        this.over = false;
        this.gameBoard.input = true;
    }

    Update() {
        if (this.over) { return; }
        const res = this.gameState.GetWinner();
        if (res == Game.NONE) {
            this.ChangeInfo(this.gameState.player);
            this.GetHumanAction();
        }
        else {
            this.GameOver(res);
        }
    }

    Stop() {
        this.gameBoard.input = false;
    }

    Restart() {
        this.gameState = new GameState(this.WIDTH, this.HEIGHT);
        this.gameBoard = new GameBoard('#gameboard', this.WIDTH, this.HEIGHT);
    }

    Undo() {
        if (this.gameState.actionHist.length > 0) {
            const last = this.gameState.actionHist[this.gameState.actionHist.length-1];
            this.gameBoard.EraseAction(last[0], last[1], last[2]);
            this.gameState.UndoAction();
            this.gameBoard.player = this.gameState.player;
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