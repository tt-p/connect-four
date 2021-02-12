class GameBoard {

    constructor(selector, width, height) {
        this.selector = selector;
        this.ROWS = height;
        this.COLS = width;
        this.#init();
        this.#initEvents();
    }

    #init() {
        this.input = false;
        this.player = Game.PLAYER_ONE;
        this.humanAction = -1;
        
        this.#initBoard();
    }

    #initBoard() {
        const $board = $(this.selector);
        $board.empty();

        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>')
            .addClass('row');
            for (let col = 0; col < this.COLS; col++) {
                const $cell = $('<div>')
                .addClass('cell empty')
                .attr('data-x', col)
                .attr('data-y', row);
                $row.append($cell);
            }
            $board.append($row);
        }
    }

    #initEvents() {
        const board = this;     
        const $board = $(this.selector);

        function getLastEmptyCell(x) {
            const cells = $(`.cell[data-x='${x}']`);
            for (let i = cells.length-1; i >= 0 ;i--) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null;
        }
        
        $board.on('mouseenter', '.cell.empty', function() {
            if (!board.input) { return; }
            const x = $(this).data('x');
            const $lastEmptyCell = getLastEmptyCell(x);
            $lastEmptyCell.addClass(`future-${PlayerColor[board.player]}`);
        })

        $board.on('mouseleave', '.cell', function () {
            $('.cell').removeClass(`future-${PlayerColor[board.player]}`);
        })

        $board.on('click', '.cell.empty', function () {
            if (!board.input) { return; }
            const x = $(this).data('x');
            board.humanAction = x;
        })
    }

    ClearBoard() {
        this.#init();
    }

    DrawAction(x, y) {
        const $cell = $(`.cell[data-x='${x}'][data-y='${y}']`);
        $cell.removeClass(`empty future-${PlayerColor[this.player]}`);
        $cell.addClass(PlayerColor[this.player]);
        this.player = (this.player == Game.PLAYER_ONE) ? Game.PLAYER_TWO : Game.PLAYER_ONE;
    }

    EraseAction(x, y) {
        this.player = (this.player == Game.PLAYER_ONE) ? Game.PLAYER_TWO : Game.PLAYER_ONE;
        const $cell = $(`.cell[data-x='${x}'][data-y='${y}']`);
        $cell.removeClass(`${PlayerColor[this.player]}`);
        $cell.addClass('empty');
    }

}