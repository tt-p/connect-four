class Evaluation {

    static Counter(state, depth, player) {
        const result = state.GetWinner();
        switch(result) {
            case player:
                return (255 - depth * 0.5);
            case Game.DRAW:
                return 0;
            case Game.NONE:
                const one = CountConnects(state, depth, Game.PLAYER_ONE);
                const two = CountConnects(state, depth, Game.PLAYER_TWO);
                return (player == Game.PLAYER_ONE) ? one - two : two - one;          
        } 
        return (-255 + depth * 0.6);

        function CountConnects(state, depth, player) {
            const c = state.combs;
            let score = -depth;
        
            for (let i = 1; i <= (state.N - 1); i++) {
                let count = 0;
                for (let j = 0; j < c.length; j++) {
                    if (Count(state, player, c[j][0], c[j][1], c[j][2], c[j][3], i)) {
                        count++;
                    }
                }
                score += Math.pow(3, i) * count * 0.5;
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