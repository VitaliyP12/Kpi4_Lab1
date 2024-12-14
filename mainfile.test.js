const { nextGeneration, countAliveNeighbors } = require('./mainfile');

describe('Game of Life', () => {
  test('Count alive neighbors near edge of the field', () => {
    const field = [
      ['.', '.', '.'],
      ['x', 'x', 'x'],
      ['.', '.', '.']
    ];
    expect(countAliveNeighbors(field, 1, 0)).toBe(1); // Має бути 1 сусід
  });

  test('Count alive neighbors for corner cell', () => {
    const field = [
      ['x', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    expect(countAliveNeighbors(field, 0, 0)).toBe(0); // Має бути 0 сусідів
  });

  test('Next generation with stable structure', () => {
    const field = [
      ['.', '.', '.', '.'],
      ['.', 'x', 'x', '.'],
      ['.', 'x', 'x', '.'],
      ['.', '.', '.', '.']
    ];
    const expected = [
      ['.', '.', '.', '.'],
      ['.', 'x', 'x', '.'],
      ['.', 'x', 'x', '.'],
      ['.', '.', '.', '.']
    ];
    expect(nextGeneration(field)).toEqual(expected); // Має залишатися стабільним
  });

  test('Next generation with oscillating structure (vertical to horizontal)', () => {
    const field = [
      ['.', '.', '.', '.', '.'],
      ['.', '.', 'x', '.', '.'],
      ['.', '.', 'x', '.', '.'],
      ['.', '.', 'x', '.', '.'],
      ['.', '.', '.', '.', '.']
    ];
    const expected = [
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', 'x', 'x', 'x', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.']
    ];
    expect(nextGeneration(field)).toEqual(expected); // Осциляція (вертикальний -> горизонтальний)
  });

  test('Next generation with single alive cell (dies)', () => {
    const field = [
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', 'x', '.', '.'],
      ['.', '.', '.', '.']
    ];
    const expected = [
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.']
    ];
    expect(nextGeneration(field)).toEqual(expected); // Одинока клітина вмирає
  });

  test('Next generation with empty field (stays empty)', () => {
    const field = [
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.']
    ];
    const expected = [
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.']
    ];
    expect(nextGeneration(field)).toEqual(expected); // Порожнє поле залишається порожнім
  });
});
