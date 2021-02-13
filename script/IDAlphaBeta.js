class IDAlphaBeta {

    constructor(evalFunc, state, maxDepth) {
        this.state = state
        this.player = state.player;
        this.evaluate = evalFunc;
        this.maxDepth = maxDepth;
        this.pervBestAction = -1;
        this.bestAction = -1;
    }

    IDAlphaBeta(state) {
        for (let depth = 1; depth < this.maxDepth; depth++) {
            try {
                var alphabeta = new AlphaBeta(this.evaluate, state, depth);
                this.bestAction = alphabeta.GetAction();
            }
            catch (err) {
                break;
            }
        }
        return this.bestAction;
    }

    GetAction() {
        this.IDAlphaBeta(this.state);
        return this.bestAction;
    }

}