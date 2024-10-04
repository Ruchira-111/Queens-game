document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const showSolutionButton = document.getElementById('showSolutionButton');
    const size = 8;
    let queens = [];
    let { regions, solution } = generateValidRegionsAndSolution(size);

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

    function generateValidRegionsAndSolution(size) {
        let regions, solution;
        do {
            ({ regions, solution } = generateRegionsAndSolution(size));
        } while (!isSolutionValid(solution));
        return { regions, solution };
    }

    function generateRegionsAndSolution(size) {
        let regions = Array.from({ length: size }, () => Array(size).fill(-1));
        let solution = [];
        let regionNumber = 0;

        // Helper function to get neighbors
        function getNeighbors(row, col) {
            const neighbors = [];
            if (row > 0) neighbors.push([row - 1, col]);
            if (row < size - 1) neighbors.push([row + 1, col]);
            if (col > 0) neighbors.push([row, col - 1]);
            if (col < size - 1) neighbors.push([row, col + 1]);
            return neighbors;
        }

        // Assign cells to regions
        while (regionNumber < size) {
            let cellsToAssign = Math.floor(size * size / size);
            let [startRow, startCol] = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];

            while (regions[startRow][startCol] !== -1) {
                [startRow, startCol] = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
            }

            let stack = [[startRow, startCol]];
            regions[startRow][startCol] = regionNumber;

            while (stack.length > 0 && cellsToAssign > 0) {
                let [row, col] = stack.pop();
                let neighbors = getNeighbors(row, col).filter(([r, c]) => regions[r][c] === -1);

                for (let [nRow, nCol] of neighbors) {
                    if (cellsToAssign > 0) {
                        regions[nRow][nCol] = regionNumber;
                        stack.push([nRow, nCol]);
                        cellsToAssign--;
                    }
                }
            }

            regionNumber++;
        }

        // Ensure each region has one queen
        let rows = Array.from({ length: size }, (_, i) => i);
        let cols = Array.from({ length: size }, (_, i) => i);

        for (let i = 0; i < size; i++) {
            let row = rows.splice(Math.floor(Math.random() * rows.length), 1);
            let col = cols.splice(Math.floor(Math.random() * cols.length), 1);
            let region = regions[row][col];
            solution.push({ row, col, region });
        }

        return { regions, solution };
    }

    function isSolutionValid(solution) {
        for (let i = 0; i < solution.length; i++) {
            for (let j = i + 1; j < solution.length; j++) {
                if (solution[i].row === solution[j].row ||
                    solution[i].col === solution[j].col ||
                    Math.abs(solution[i].row - solution[j].row) === Math.abs(solution[i].col - solution[j].col)) {
                    return false;
                }
            }
        }
        return true;
    }

    // Show solution when button is clicked
    showSolutionButton.addEventListener('click', showSolution);
});
