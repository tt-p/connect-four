class GameState {

    constructor(width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.N = AppConfig.N;
        this.#init();
        this.#setCombs();
    }

    #init() {
        this.board = Array.from(Array(this.WIDTH), () => new Array(this.HEIGHT).fill(Game.NONE));
        this.emptySpace = this.WIDTH * this.HEIGHT; 
        this.colFullness = (new Array(this.WIDTH)).fill(0);
           
        this.player = Game.PLAYER_ONE;
        this.actionHist = [];
        this.combs = [];
    }

    #setCombs() {
        const board = this;
        [[1,0], [0,1], [1,1], [1,-1]].forEach(function(dir) {
            Array.from(Array(board.WIDTH).keys()).forEach(function(x) {
                Array.from(Array(board.HEIGHT).keys()).forEach(function(y) {
                    board.combs.push([x, y, dir[0], dir[1]]);
                })
            })
        });
    }

    GetValue(x, y) {
        return this.board[x][y];
    }

    GetAvailableRow(x) {
        return (this.HEIGHT-1) - this.colFullness[x];
    }

    IsValid(x, y) {
        return x >= 0 && x < this.WIDTH &&
               y >= 0 && y < this.HEIGHT;
    }

    IsLegalAction(x) {
        return x >= 0 && x < this.WIDTH && 
        this.colFullness[x] < this.HEIGHT;
    }

    GetLegalActions() {
        return Array.from(Array(this.WIDTH).keys())
        .filter(x => this.IsLegalAction(x));
    }

    DoAction(x) {
        const y = this.GetAvailableRow(x);
        this.actionHist.push([x, y, this.player]);
        this.board[x][y] = this.player;
        this.colFullness[x]++;
        this.emptySpace--;
        this.player = (this.player == Game.PLAYER_ONE) ? Game.PLAYER_TWO : Game.PLAYER_ONE;
    }

    UndoAction() {
        if (this.actionHist.length > 0) {
            const action = this.actionHist.pop();
            const x = action[0];
            const y = action[1];
            this.board[x][y] = Game.NONE;
            this.colFullness[x]--;
            this.emptySpace++;
            this.player = (this.player == Game.PLAYER_ONE) ? Game.PLAYER_TWO : Game.PLAYER_ONE;
        }
    }

    CheckWin(x, y, dx, dy, n) {
        const player = this.GetValue(x,y);
        if (player != Game.NONE) {  
            for (let i = 0; i < n - 1; i++) {
                x += dx; y += dy;
                if (!this.IsValid(x, y) || this.GetValue(x, y) != player) { return false; }
            }
            return true;
        }
    }

    GetWinner() {
        const c = this.combs;
        for (let i = 0; i < c.length; i++) {          
            if (this.CheckWin(c[i][0], c[i][1], c[i][2], c[i][3], this.N)) {
                return this.GetValue(c[i][0], c[i][1]); 
            }
        }    
        return (this.emptySpace == 0) ? Game.DRAW : Game.NONE; 
    }

}