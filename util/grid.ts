function checkLayer(layerNum: number, rowNum: number, numRows: number) {
  const numLayerRows = layerNum * 4 + 1;
  const startRow = (numRows - 1) / 2 - 2 * layerNum;
  const endRow = startRow + numLayerRows - 1;
  const layerInRow = rowNum >= startRow && rowNum <= endRow;
  const isEvenLayer = layerNum % 2;
  const isEvenRow = rowNum % 2;
  const rowLayerMismatch = isEvenLayer !== isEvenRow;
  const m3Start = startRow + layerNum + 1;
  const m3Size = (layerNum - 1) * 2 + 1;
  const m3End = m3Start + m3Size - 1;
  const isMidThird = rowNum >= m3Start && rowNum <= m3End;
  const isLayer0 = layerNum === 0;
  const badThird = isMidThird && rowLayerMismatch;
  const m3Shift = isLayer0 || !badThird;
  return { layerInRow, m3Shift, startRow, endRow };
}

function createBoard(maxDepth: number) {
  // const maxAngle = maxDepth * 6 -1
  const layers = [...new Array(maxDepth)].map((_, depth) => {
    const layer = [];
    const maxAngle = Math.max(0, depth * 6 - 1);
    for (let angle = 0; angle <= maxAngle; angle++) {
      layer.push(`(${depth}, ${angle})`);
    }
    return layer;
  });
  console.log("Layers:");
  console.log(layers);

  // Print board
  const numRows = (layers.length - 1) * 4 + 1;
  const rows = [...new Array(numRows)].map((_) => [] as string[]);
  for (let rowNum = 0; rowNum < numRows; rowNum++) {
    const row = rows[rowNum];
    // console.log(`Row: ${rowNum}`);
    for (let layerNum = layers.length - 1; layerNum >= 0; layerNum--) {
      const { layerInRow, m3Shift, endRow } = checkLayer(
        layerNum,
        rowNum,
        numRows
      );

      const endRowRule = rowNum !== endRow || layerNum === 0;
      if (layerInRow && m3Shift && endRowRule) {
        const tile = layers[layerNum].shift();
        if (!tile) {
          throw Error("Hex tile not found in layer");
        }
        // console.log(`Shifting Layer: ${layerNum}, Row: ${rowNum}: ${tile}`);
        row.push(tile);
      }
    }

    // for (let layerNum = layers.length - 1; layerNum >= 0; layerNum--) {
    for (let layerNum = 0; layerNum < layers.length; layerNum++) {
      const { layerInRow, m3Shift, startRow } = checkLayer(
        layerNum,
        rowNum,
        numRows
      );

      if (layerInRow && m3Shift && rowNum !== startRow) {
        const tile = layers[layerNum].pop();
        // console.log(`Popping Layer: ${layerNum}, Row: ${rowNum}: ${tile}`);
        if (!tile) {
          throw Error("Hex tile not found in layer");
        }
        row.push(tile);
      }
    }
  }
  console.log("Board:");
  console.log(rows);
}

createBoard(3);

function printHoneycomb(sideLen: number) {
  const hexagon = "🔳";
  const space = " ";
  const lineBreak = "\n";

  let honeycomb = "";
  for (let i = 0; i < sideLen; i++) {
    honeycomb += space.repeat(sideLen - i);
    honeycomb += hexagon.repeat(sideLen + i);
    honeycomb += lineBreak;
  }
  for (let i = sideLen - 2; i >= 0; i--) {
    honeycomb += space.repeat(sideLen - i);
    honeycomb += hexagon.repeat(sideLen + i);
    honeycomb += lineBreak;
  }

  console.log(honeycomb);
}

printHoneycomb(5);
