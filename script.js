document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const size = 8;
    let queens = [];

    // Create the board
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', placeQueen);
            board.appendChild(cell);
        }
    }

    function placeQueen(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (cell.classList.contains('queen')) {
            cell.classList.remove('queen');
            queens = queens.filter(q => q.row !== row || q.col !== col);
        } else {
            if (isValidMove(row, col)) {
                cell.classList.add('queen');
                queens.push({ row, col });
            } else {
                alert('Invalid move!');
            }
        }
    }

    function isValidMove(row, col) {
        for (let queen of queens) {
            if (queen.row === row || queen.col === col || Math.abs(queen.row - row) === Math.abs(queen.col - col)) {
                return false;
            }
        }
        return true;
    }
});
