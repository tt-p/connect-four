class Minimax {

    constructor(evalFunc, state, maxDepth) {
        this.state = state
        this.player = state.player;
        this.evaluate = evalFunc;
        this.maxDepth = maxDepth;
        this.bestAction = -1;
    }

    MiniMax(state, depth, isMax) {
        const result = state.GetWinner();
        if (result != Game.NONE || depth >= this.maxDepth) { return this.evaluate(state, depth, this.player); }

        var actions = state.GetLegalActions();
        if (isMax) {         
            var max = -Infinity;
            for (let i = 0; i < actions.length; i++) {
                state.DoAction(actions[i]);
                var temp = this.MiniMax(state, (depth + 1), false);
                state.UndoAction();

                if (temp > max) {
                    max = temp;
                    if (depth == 0) { this.bestAction = actions[i]; }
                }
            }
            return max;
        }
        else {
            var min = +Infinity;
            for (let i = 0; i < actions.length; i++) {
                state.DoAction(actions[i]);
                var temp = this.MiniMax(state, (depth + 1), true);
                state.UndoAction();

                if (temp < min) { min = temp; }
            }
            return min;
        }
    }

    GetAction() {
        this.MiniMax(this.state, 0, true);
        return this.bestAction;
    }

}