import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 500px;
`

const Cell = styled.div`
  position: relative;
  margin: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;

  &.clickable {
    cursor: pointer;

    :hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
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
  onCellClick?(cell: CellIndex): void
}

const Board: React.FC<IBoardProps> = ({ cells, onCellClick }) => {
  const cellWidth = `calc(${(1 / Math.sqrt(cells.length)) * 100}% - 2px)`

  return (
    <Wrap>
      {cells.map((cellValue, cellIndex) => (
        <Cell
          key={cellIndex}
          style={{ width: cellWidth, paddingBottom: cellWidth }}
          className={onCellClick && cellValue === null ? 'clickable' : ''}
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
