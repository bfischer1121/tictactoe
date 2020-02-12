const winningCombos: Combo[] = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
]

export const getInitialCombos = (): Combos => ({ x: winningCombos.slice(0), o: winningCombos.slice(0) })

export const getInitialCells = (): null[] => new Array(9).fill(null)

/**
 * Removes a cell from the combos of the player who selected it, reducing the remaining cells necessary for a win.
 *
 * @param combos The active player's combos
 * @param cell The cell they selected
 */
export const dropCellFromCombos = (combos: Combo[], cell: CellIndex): Combo[] =>
  combos.map(combo => combo.filter(comboCell => comboCell !== cell))

/**
 * Removes the other player's combos that contain the cell that the active player selected, reducing their winning combos.
 *
 * @param combos The other player's combos
 * @param cell The cell that the active player selected
 */
export const dropCombosWithCell = (combos: Combo[], cell: CellIndex): Combo[] =>
  combos.filter(combo => !combo.includes(cell))

/**
 * Calculates scores for every cell based on number of moves to a win then
 * number of combos the cell is present in. A lower score is better.
 *
 * @param combos The combos in play for a particular player
 */
const getCellScores = (combos: Combo[]) => {
  const cellScores: { [cell: number]: number } = {}

  combos
    .sort((c1, c2) => c1.length - c2.length)
    .forEach(combo => {
      combo.forEach(cell => {
        cellScores[cell] = cellScores[cell] ? cellScores[cell] - 1 : combo.length * 100
      })
    })

  return Object.entries(cellScores).sort((c1, c2) => c1[1] - c2[1])
}

/**
 * Determines the computer's next move based on a scoring of different scenarios.
 *
 * Order of preference:
 * 1 remaining, mine (win)
 * 1 remaining, theirs (avoid loss)
 * 2 remaining, 2 combo, mine ("checkmate" equiv)
 * 2 remaining, 1 combo, mine (force hand)
 * 2 remaining, 2 combo, theirs (avoid "checkmate")
 *
 * @param combos The combos in play for 2 players
 * @returns The index of the cell the computer should select
 */
export const getComputerMove = (combos: Combos): CellIndex =>
  +[...getCellScores(combos.o), ...getCellScores(combos.x)].sort((c1, c2) => c1[1] - c2[1])[0][0]
