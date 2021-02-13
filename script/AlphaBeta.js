class AlphaBeta {

    constructor(evalFunc, state, maxDepth) {
        this.state = state
        this.player = state.player;
        this.evaluate = evalFunc;
        this.maxDepth = maxDepth;
        this.bestAction = -1;
    }

    AlphaBeta(state, depth, isMax, alpha, beta) {

        const result = state.GetWinner();
        if (result != Game.NONE || depth >= this.maxDepth) { return this.evaluate(state, depth, this.player); }

        var actions = state.GetLegalActions();
        for (let i = 0; i < actions.length; i++) {
            state.DoAction(actions[i]);
            var temp = this.AlphaBeta(state, (depth + 1), !isMax, alpha, beta);
            state.UndoAction();

            if (isMax && (temp > alpha)) {
                alpha = temp;
                if (depth == 0) { this.bestAction = actions[i]; }
            }
            if (!isMax && (temp < beta)) { beta = temp; }
            if (alpha >= beta) { break; }
        }
        return isMax ? alpha : beta;
    }

    GetAction() {
        this.AlphaBeta(this.state, 0, true, -Infinity, +Infinity);
        return this.bestAction;
    }

}