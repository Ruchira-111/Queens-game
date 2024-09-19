document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const size = 8;
    let queens = [];

    // Define regions
    const regions = [
        [0, 0, 0, 1, 1, 2, 2, 2],
        [0, 0, 1, 1, 1, 2, 2, 2],
        [3, 3, 3, 4, 4, 4, 5, 5],
        [3, 3, 3, 4, 4, 4, 5, 5],
        [6, 6, 6, 7, 7, 7, 8, 8],
        [6, 6, 6, 7, 7, 7, 8, 8],
        [9, 9, 9, 10, 10, 10, 11, 11],
        [9, 9, 9, 10, 10, 10, 11, 11]
    ];

    // Create the board
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', `region${regions[i][j]}`);
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.dataset.region = regions[i][j];
            cell.addEventListener('click', placeQueen);
            board.appendChild(cell);
        }
    }

    function placeQueen(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const region = parseInt(cell.dataset.region);

        if (cell.classList.contains('queen')) {
            cell.classList.remove('queen');
            queens = queens.filter(q => q.row !== row || q.col !== col);
        } else {
            if (isValidMove(row, col, region)) {
                cell.classList.add('queen');
                queens.push({ row, col, region });
            } else {
                alert('Invalid move!');
            }
        }
    }

    function isValidMove(row, col, region) {
        for (let queen of queens) {
            if (queen.row === row || queen.col === col || queen.region === region ||
                Math.abs(queen.row - row) === Math.abs(queen.col - col) ||
                Math.abs(queen.row - row) <= 1 && Math.abs(queen.col - col) <= 1) {
                return false;
            }
        }
        return true;
    }
});
