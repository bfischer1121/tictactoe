type Player = 'x' | 'o'
type CellIndex = number
type CellValue = Player | null
type Combo = CellIndex[]
type Combos = { [player in Player]: Combo[] }
