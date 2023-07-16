

layer in row?
  numLayerRows = layerNum * 4 + 1
  startRow = (maxRows - 1) / 2 - 2 * layerNum
  endRow = startRow + numLayerRows - 1
  Layer in row if startRow >= rowNum && endRow <= rowNum

Shift allowed?
  Not allowed if 
  1. not layer 0,
  2. in mid third,
  3. even if odd layerNum in even rowNum and vv

  if numLayer = 0 return true

  isEvenLayer = layerNum % 2
  isEvenRow = rowNum % 2
  rowLayerMismatch = isEvenLayer !== isEvenRow


  m3Start = startRow + layerNum + 1
  m3Size = (numLayer - 1) * 2 + 1
  m3End = m3Start + m3Size - 1

  isMidThird = rowNum >= m3Start and rowNum <= m3End

  if rowLayerMismatch && ism3 return false
  return true

numRows = numLayers * 4 + 1
For each row:
  For each layer:
    If layer is in row:
      If shiftAllowed:
        Shift layer and push into row
  For each layer.reverse():
    If layer is in row:
      Pop layer and push into row
