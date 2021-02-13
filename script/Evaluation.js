class Evaluation {

    static Counter(state, depth, player) {
        const result = state.GetWinner();
        switch(result) {
            case player:
                return (1025 - depth * 0.6);
            case Game.DRAW:
                return 0;
            case Game.NONE:
                switch(player) {
                    case Game.PLAYER_ONE:
                        return CountConnects(state, depth, Game.PLAYER_ONE, 2, (state.N - 1)) -
                        CountConnects(state, depth, Game.PLAYER_TWO, (state.N - 2), (state.N - 1));
                    case Game.PLAYER_TWO:
                        return CountConnects(state, depth, Game.PLAYER_TWO, 2, (state.N - 1)) -
                        CountConnects(state, depth, Game.PLAYER_ONE, (state.N - 2), (state.N - 1));
                }
                return CountConnects(state, depth, Game.PLAYER_ONE, 2, (state.N - 1)) -
                CountConnects(state, depth, Game.PLAYER_TWO, (state.N - 2), (state.N - 1));         
        } 
        return (-1025 + depth * 0.8);

        function CountConnects(state, depth, player, start, end) {
            const c = state.combs;
            let score = -depth;
        
            for (let i = start; i <= end; i++) {
                let count = 0;
                for (let j = 0; j < c.length; j++) {
                    if (Count(state, player, c[j][0], c[j][1], c[j][2], c[j][3], i)) {
                        count++;
                    }
                }
                score += Math.pow(4, i) * count * 0.5;
            }    
            return score;
        }

        function Count(state, player, x, y, dx, dy, n) {
            const value = state.GetValue(x,y);
            if (value != Game.None) {
                for (let i = 0; i < n - 1; i++) {
                    x += dx; y += dy;
                    if (!state.IsValid(x, y) || state.GetValue(x, y) != player) { return false; }
                }
                return true;
            }
        }
    }
}