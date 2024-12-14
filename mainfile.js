const fs = require('fs');

// Читаємо вхідні дані
function readInput(filePath) {
    const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    const generations = parseInt(data[0]); // Кількість поколінь
    const [rows, cols] = data[1].split(' ').map(Number); // Розміри поля
    const field = data.slice(2).map(row => row.split('')); // Початковий стан
    return { generations, rows, cols, field };
}

// Розраховуємо сусідів
function countAliveNeighbors(field, x, y) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    const rows = field.length;
    const cols = field[0].length;
    let count = 0;

    directions.forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;

        // Перевірка на вихід за межі поля
        if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
            if (field[nx][ny] === 'x') {
                count++;
            }
        }
    });

    return count;
}

// Оновлюємо стан поля
function nextGeneration(field) {
    const rows = field.length;
    const cols = field[0].length;
    const newField = Array.from({ length: rows }, () => Array(cols).fill('.'));

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            const aliveNeighbors = countAliveNeighbors(field, x, y);

            if (field[x][y] === 'x') {
                if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                    newField[x][y] = 'x';
                }
            } else {
                if (aliveNeighbors === 3) {
                    newField[x][y] = 'x';
                }
            }
        }
    }

    return newField;
}

// Основна функція
function mainfile(inputFile, outputFile) {
    const { generations, rows, cols, field } = readInput(inputFile);
    let currentField = field;

    for (let gen = 0; gen < generations; gen++) {
        currentField = nextGeneration(currentField);
    }

    const output = currentField.map(row => row.join('')).join('\n');
    fs.writeFileSync(outputFile, output);
}

// Запуск програми
const inputFile = 'input.txt'; // Задайте шлях до вхідного файлу
const outputFile = 'output.txt'; // Задайте шлях до вихідного файлу
mainfile(inputFile, outputFile);

module.exports = { countAliveNeighbors, nextGeneration };
