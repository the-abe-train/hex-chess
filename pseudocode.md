# Printing the board

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

# Traversing the board
1. Find fractional angle using angle / layer length
2. Identify which corner or edge
3. Check map 
4. Find out if you are you staying in layer
5. If you are, that should be a quick calc
6. If you are leaving your layer, find the new layer
7. 


## Going up
You can figure out which edge you're on using angle / layer length


## Going north from (3, 10)
Fractional angle = 10 / 18 = 5 / 9
Corners are 0, 1/6, 1/3, 1/2, 2/3, 5/6. Sides are the numbers between those.
(3, 10) is SE side
North means:
Layer goes down by one (2)
Angle is maintained but rounded up to fit
12 * 5 / 9 = 6.667 = 7

