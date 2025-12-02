import patterns from './utils.js';

(function () {
    class GameOfLife {
        constructor(canvas, cellSize = 10) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.cellSize = cellSize;
            this.cols = Math.floor(canvas.width / cellSize);
            this.rows = Math.floor(canvas.height / cellSize);

            this.grid = this.createGrid();
            this.running = false;
            this.generation = 0;
            this.speed = 10;

            this.setupEventListeners();
            this.draw();
        }

        createGrid() {
            return Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        }

        setupEventListeners() {
            this.canvas.addEventListener('click', (e) => this.handleClick(e));
            this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.canvas.addEventListener('mousedown', () => this.isDrawing = true);
            this.canvas.addEventListener('mouseup', () => this.isDrawing = false);
        }

        handleClick(e) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.floor(x / this.cellSize);
            const row = Math.floor(y / this.cellSize);

            if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
                this.grid[row][col] = !this.grid[row][col];
                this.draw();
                this.updateStats();
            }
        }

        handleMouseMove(e) {
            if (!this.isDrawing) return;

            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.floor(x / this.cellSize);
            const row = Math.floor(y / this.cellSize);

            if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
                this.grid[row][col] = true;
                this.draw();
                this.updateStats();
            }
        }

        countNeighbors(row, col) {
            let count = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;

                    const newRow = (row + i + this.rows) % this.rows;
                    const newCol = (col + j + this.cols) % this.cols;

                    if (this.grid[newRow][newCol]) {
                        count++;
                    }
                }
            }
            return count;
        }

        update() {
            const newGrid = this.createGrid();

            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    const neighbors = this.countNeighbors(row, col);
                    const cell = this.grid[row][col];

                    if (cell && (neighbors === 2 || neighbors === 3)) {
                        newGrid[row][col] = true;
                    } else if (!cell && neighbors === 3) {
                        newGrid[row][col] = true;
                    }
                }
            }

            this.grid = newGrid;
            this.generation++;
            this.draw();
            this.updateStats();
        }

        draw() {
            this.ctx.fillStyle = '#f8f9fa';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.strokeStyle = '#e0e0e0';
            this.ctx.lineWidth = 0.5;

            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    const x = col * this.cellSize;
                    const y = row * this.cellSize;

                    if (this.grid[row][col]) {
                        this.ctx.fillStyle = '#667eea';
                        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                    }

                    this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                }
            }
        }

        start() {
            if (this.running) return;
            this.running = true;
            this.animate();
        }

        stop() {
            this.running = false;
        }

        animate() {
            if (!this.running) return;

            this.update();

            setTimeout(() => {
                requestAnimationFrame(() => this.animate());
            }, 1000 / this.speed);
        }

        step() {
            this.update();
        }

        clear() {
            this.grid = this.createGrid();
            this.generation = 0;
            this.draw();
            this.updateStats();
        }

        randomize() {
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.grid[row][col] = Math.random() > 0.7;
                }
            }
            this.generation = 0;
            this.draw();
            this.updateStats();
        }

        updateStats() {
            let population = 0;
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    if (this.grid[row][col]) population++;
                }
            }
            document.getElementById('generation').textContent = this.generation;
            document.getElementById('population').textContent = population;
        }

        loadPattern(patternName) {
            this.clear();
            const pattern = patterns[patternName];
            if (!pattern) return;

            // 1. Find bounding box of the pattern
            const rows = pattern.map(([r, _]) => r);
            const cols = pattern.map(([_, c]) => c);

            const minRow = Math.min(...rows);
            const maxRow = Math.max(...rows);
            const minCol = Math.min(...cols);
            const maxCol = Math.max(...cols);

            const patternHeight = maxRow - minRow + 1;
            const patternWidth = maxCol - minCol + 1;

            // 2. Compute top-left so the pattern is centered
            const startRow = Math.floor((this.rows - patternHeight) / 2) - minRow;
            const startCol = Math.floor((this.cols - patternWidth) / 2) - minCol;

            // 3. Place cells
            pattern.forEach(([row, col]) => {
                const newRow = row + startRow;
                const newCol = col + startCol;

                if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                    this.grid[newRow][newCol] = true;
                }
            });

            this.draw();
            this.updateStats();
        }

    }

    const canvas = document.getElementById('gameCanvas');
    const game = new GameOfLife(canvas);
    window.game = game;

    document.getElementById('startBtn').addEventListener('click', () => {
        game.start();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    });

    document.getElementById('stopBtn').addEventListener('click', () => {
        game.stop();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    });

    document.getElementById('stepBtn').addEventListener('click', () => {
        game.step();
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        game.clear();
    });

    document.getElementById('randomBtn').addEventListener('click', () => {
        game.randomize();
    });

    const speedSlider = document.getElementById('speed');
    const speedValue = document.getElementById('speedValue');

    speedSlider.addEventListener('input', (e) => {
        game.speed = parseInt(e.target.value);
        speedValue.textContent = e.target.value;
    });

    // Modal functionality
    const modal = document.getElementById('rulesModal');
    const rulesBtn = document.getElementById('rulesBtn');
    const closeBtn = document.getElementsByClassName('close')[0];

    rulesBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    game.updateStats();
})();