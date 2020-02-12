import React from 'react'
import styled, { keyframes } from 'styled-components'
import { compact } from 'lodash-es'
import { lighten } from 'polished'

const pop = keyframes`
  0%{
    transform: scale3d(1, 1, 1);
    box-shadow: none;
  }

  50%{
    transform: scale3d(1.2, 1.2, 1.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  100%{
    transform: scale3d(1, 1, 1);
    box-shadow: none;
  }
`

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 500px;
`

const Cell = styled.div`
  position: relative;
  margin: 1px;
  background-color: ${lighten(0.1, '#20202a')};
  color: #fff;

  &.clickable {
    cursor: pointer;

    :hover {
      background-color: ${lighten(0.2, '#20202a')};
    }
  }

  &.winning-cell-0,
  &.winning-cell-1,
  &.winning-cell-2 {
    animation: 1500ms ${pop} ease-in-out;
  }

  &.winning-cell-1 {
    animation-delay: 500ms;
  }

  &.winning-cell-2 {
    animation-delay: 1000ms;
  }
`

const XMark = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;

  :before,
  :after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(50% - 2px);
    display: block;
    content: '';
    width: 4px;
    border-radius: 2px;
    background: #fff;
  }

  :before {
    transform: rotate(-45deg);
  }

  :after {
    transform: rotate(45deg);
  }
`

const OMark = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  border-radius: 100%;
  border: 4px solid #fff;
`

interface IBoardProps {
  cells: CellValue[]
  winner?: { player: Player | null; combo: Combo } | null
  onCellClick?(cell: CellIndex): void
}

const Board: React.FC<IBoardProps> = ({ cells, winner, onCellClick }) => {
  const cellWidth = `calc(${(1 / Math.sqrt(cells.length)) * 100}% - 2px)`

  return (
    <Wrap>
      {cells.map((cellValue, cellIndex) => (
        <Cell
          key={cellIndex}
          style={{ width: cellWidth, paddingBottom: cellWidth }}
          className={compact([
            onCellClick && cellValue === null ? 'clickable' : null,
            winner && winner.combo.includes(cellIndex) ? `winning-cell-${winner.combo.indexOf(cellIndex)}` : null
          ]).join(' ')}
          onClick={() => onCellClick && cellValue === null && onCellClick(cellIndex)}
        >
          {cellValue === 'x' && <XMark />}
          {cellValue === 'o' && <OMark />}
        </Cell>
      ))}
    </Wrap>
  )
}

export default Board
