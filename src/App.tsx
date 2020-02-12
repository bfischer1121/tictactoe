import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { getInitialCombos, getInitialCells, dropCellFromCombos, dropCombosWithCell, getComputerMove } from './lib/logic'
import Board from './components/Board'

const GlobalStyle = createGlobalStyle`
  body{
    background: #000;
    margin: 0;
    font-family: -apple-system, 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`

const App: React.FC<{}> = () => {
  const [combos, setCombos] = useState<Combos>(getInitialCombos())
  const [cells, setCells] = useState<CellValue[]>(getInitialCells())
  const [activePlayer, setActivePlayer] = useState<Player>('x')

  const otherPlayer: Player = activePlayer === 'x' ? 'o' : 'x'

  const selectCell = (cell: CellIndex) => {
    setCells([...cells.slice(0, cell), activePlayer, ...cells.slice(cell + 1)])
    setCombos({
      [activePlayer]: dropCellFromCombos(combos[activePlayer], cell),
      [otherPlayer]: dropCombosWithCell(combos[otherPlayer], cell)
    } as { [player in Player]: number[][] })
    setActivePlayer(otherPlayer)
  }

  if (activePlayer === 'o') {
    selectCell(getComputerMove(combos))
  }

  return (
    <Wrap>
      <GlobalStyle />
      <Board cells={cells} {...(activePlayer === 'x' ? { onCellClick: selectCell } : {})} />
    </Wrap>
  )
}

export default App
