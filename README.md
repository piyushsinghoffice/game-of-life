# Conway's Game of Life in JavaScript

This is a simple, interactive implementation of John Conway's Game of Life, built with HTML, CSS, and modern JavaScript. You can set up an initial state by clicking on the grid and watch it evolve, or load from a set of classic preset patterns.

![Game of Life Demo](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdG92empzeWh6N3V3a2M3cHg5eHptdGdnbGdlOHEwMjh2YXRkN2o2OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LrY1e5IDFLc1XtDKZf/giphy.gif)

## Features

- **Interactive Grid**: Click or drag on the canvas to toggle cells between alive and dead.
- **Simulation Controls**: Start, stop, and step through generations one at a time.
- **Adjustable Speed**: Control the simulation speed with a slider.
- **Grid Management**: Clear the grid to start fresh or populate it with a random pattern.
- **Preset Patterns**: Load classic patterns like "Glider," "Pulsar," and "Glider Gun" to see them in action.
- **Live Stats**: See the current generation number and living cell population updated in real-time.
- **Informative Rules**: An in-app modal explains the rules of the game.

## How to Run

This is a static web project with no build dependencies. To run it, simply open the `index.html` file in your web browser.

1.  Clone this repository.
2.  Navigate to the project directory.
3.  Open `index.html` in a browser like Chrome, Firefox, or Safari.

## The Rules of the Game

The Game of Life is a zero-player game, meaning its evolution is determined by its initial state, requiring no further input. The universe is an infinite, two-dimensional orthogonal grid of square "cells," each of which is in one of two possible states, "alive" or "dead."

Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1.  **Underpopulation**: A living cell with fewer than two living neighbours dies.
2.  **Survival**: A living cell with two or three living neighbours survives to the next generation.
3.  **Overpopulation**: A living cell with more than three living neighbours dies.
4.  **Reproduction**: A dead cell with exactly three living neighbours becomes a living cell.

These simple rules give rise to complex and fascinating emergent behavior, including static patterns (**still lifes**), repeating patterns (**oscillators**), and patterns that move across the grid (**spaceships**).
