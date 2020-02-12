import React, { useState, useMemo } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { lighten } from 'polished'

import {
  getInitialCombos,
  getInitialCells,
  getWinner,
  dropCellFromCombos,
  dropCombosWithCell,
  isDraw,
  getComputerMove
} from './lib/logic'

import Board from './components/Board'

const GlobalStyle = createGlobalStyle`
  body{
    background: #20202a;
    margin: 0;
    font-family: -apple-system, 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`

const Wrap = styled.div`
  max-width: 500px;
  margin: 15px auto;
`

const Outcome = styled.div`
  padding: 10px 20px;
  margin: 20px auto 0;
  max-width: 200px;
  color: #fff;
  font-size: 20px;
  background: ${lighten(0.1, '#20202a')};
  border-radius: 5px;
  text-align: center;
`

const Button = styled.div`
  padding: 10px 20px;
  margin: 20px auto 0;
  color: #fff;
  font-size: 14px;
  background: #1fa1f3;
  border-radius: 50px;
  cursor: pointer;
  max-width: 200px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;

  :hover {
    background: ${lighten(0.05, '#1fa1f3')};
  }
`

const App: React.FC<{}> = () => {
  const [combos, setCombos] = useState<Combos>(getInitialCombos())
  const [cells, setCells] = useState<CellValue[]>(getInitialCells())
  const [activePlayer, setActivePlayer] = useState<Player>('x')

  const otherPlayer: Player = activePlayer === 'x' ? 'o' : 'x'
  const winner = useMemo(() => getWinner(cells), [cells])
  const draw = useMemo(() => isDraw(cells), [cells])

  const humanPlaying = !draw && !winner && activePlayer === 'x'
  const computerPlaying = !draw && !winner && activePlayer === 'o'

  const selectCell = (cell: CellIndex) => {
    setCells([...cells.slice(0, cell), activePlayer, ...cells.slice(cell + 1)])
    setCombos({
      [activePlayer]: dropCellFromCombos(combos[activePlayer], cell),
      [otherPlayer]: dropCombosWithCell(combos[otherPlayer], cell)
    } as { [player in Player]: number[][] })
    setActivePlayer(otherPlayer)
  }

  const onPlayAgainButtonClick = () => {
    setCombos(getInitialCombos())
    setCells(getInitialCells())
    setActivePlayer('x')
  }

  if (computerPlaying) {
    selectCell(getComputerMove(combos))
  }

  return (
    <Wrap>
      <GlobalStyle />
      <Board cells={cells} winner={winner} {...(humanPlaying ? { onCellClick: selectCell } : {})} />
      {(winner || isDraw) && (
        <>
          {draw && <Outcome>Draw!</Outcome>}
          {winner && <Outcome>{winner.player === 'x' ? 'You win!' : 'Computer wins!'}</Outcome>}
          <Button onClick={onPlayAgainButtonClick}>Play Again</Button>
        </>
      )}
    </Wrap>
  )
}

export default App
