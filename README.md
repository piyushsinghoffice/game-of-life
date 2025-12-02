# Conway's Game of Life - Rules
The Game of Life is a cellular automaton created by mathematician John Conway in 1970. It's a zero-player game where you set up an initial configuration and watch it evolve.

## The Rules
Each cell in the grid can be either alive (colored) or dead (empty). On each generation, the following rules apply:

- **Birth:** A dead cell with exactly 3 living neighbors becomes alive
- **Survival:** A living cell with 2 or 3 living neighbors stays alive
- **Death by isolation:** A living cell with fewer than 2 neighbors dies
- **Death by overcrowding:** A living cell with more than 3 neighbors dies

## Neighbors
Each cell has 8 neighbors: the cells directly adjacent horizontally, vertically, and diagonally.

## Interesting Patterns
- **Still lifes:** Patterns that don't change (like the Block)
- **Oscillators:** Patterns that repeat after a fixed number of generations (like the Blinker)
- **Spaceships:** Patterns that move across the grid (like the Glider)
- **Methuselahs:** Small patterns that take many generations to stabilize
Try the preset patterns to see these different behaviors in action!

## Code Structure and Modularization

This project's code has been modularized to improve maintainability and organization. Here's a breakdown of the file structure and their responsibilities:

-   **`index.html`**: This file contains the main HTML structure of the application. It now links to external CSS and JavaScript files, rather than embedding them directly. It also includes the necessary `type="module"` attribute for the JavaScript files to enable ES6 module imports.
-   **`style.css`**: This file contains all the CSS rules that define the visual presentation of the Game of Life interface. Separating styles into this file keeps the HTML clean and makes it easier to manage the application's appearance.
-   **`script.js`**: This file contains the core JavaScript logic for Conway's Game of Life. It defines the `GameOfLife` class, which handles game mechanics, rendering, and user interactions. The code within `script.js` is encapsulated within an Immediately Invoked Function Expression (IIFE) to prevent global scope pollution. The `game` object is exposed globally via `window.game` only for the `loadPattern` method, which is called directly from HTML `onclick` attributes.
-   **`utils.js`**: This file is dedicated to storing predefined patterns for the Game of Life (e.g., Glider, Blinker, Pulsar). These patterns are exported as an ES6 module and imported by `script.js`, ensuring a clean separation of data from application logic.

This modular approach makes the codebase easier to understand, debug, and extend in the future.