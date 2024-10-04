document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const showSolutionButton = document.getElementById('showSolutionButton');
    const size = 8;
    let queens = [];
    let solution = generateSolution(size);
    let regions = generateRegions(size);

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

    function showSolution() {
        clearBoard();
        for (let queen of solution) {
            const cell = document.querySelector(`.cell[data-row='${queen.row}'][data-col='${queen.col}']`);
            cell.classList.add('queen');
        }
    }

    function clearBoard() {
        document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('queen'));
        queens = [];
    }

    function generateRegions(size) {
        let regions = Array.from({ length: size }, () => Array(size).fill(0));
        let regionNumbers = Array.from({ length: size }, (_, i) => i);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let randomIndex = Math.floor(Math.random() * regionNumbers.length);
                regions[i][j] = regionNumbers[randomIndex];
                regionNumbers.splice(randomIndex, 1);
                if (regionNumbers.length === 0) {
                    regionNumbers = Array.from({ length: size }, (_, i) => i);
                }
            }
        }
        return regions;
    }

    function generateSolution(size) {
        let solution = [];
        let rows = Array.from({ length: size }, (_, i) => i);
        let cols = Array.from({ length: size }, (_, i) => i);
        let regions = Array.from({ length: size }, (_, i) => i);

        for (let i = 0; i < size; i++) {
            let row = rows.splice(Math.floor(Math.random() * rows.length), 1);
            let col = cols.splice(Math.floor(Math.random() * cols.length), 1);
            let region = regions.splice(Math.floor(Math.random() * regions.length), 1);
            solution.push({ row, col, region });
        }
        return solution;
    }

    // Show solution when button is clicked
    showSolutionButton.addEventListener('click', showSolution);
});

