// export function add(a: number, b: number): number {
//   return a + b;
// }

// // Learn more at https://deno.land/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }

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

// function createBoard(sideLen: number) {

// }

// type Spot = {
//   a: number;
//   r: number;
//   c: number;
// };

class Spot {
  a: 0 | 1;
  r: number;
  c: number;

  constructor(a: number, r: number, c: number) {
    if (a < 0 || a > 1) {
      throw Error("'a' is out of bounds");
    }
    this.a = a as 0 | 1;
    this.r = r;
    this.c = c;
  }
}

/*
Depth and angle coordinates
Origin: (0, 0)
Max Angle = depth * 6 - 1
Hex data = [
  [(0, 0)], 
  [(1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (1, 5)]
]
*/

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
  console.log(layers);

  // function

  // Print board
  const numRows = (layers.length - 1) * 4 + 1;
  const rows = [...new Array(numRows)].map((_) => [] as string[]);
  console.log(rows);
  for (let rowNum = 0; rowNum < numRows; rowNum++) {
    const row = rows[rowNum];
    console.log(`Row: ${rowNum}`);
    for (let layerNum = layers.length - 1; layerNum >= 0; layerNum--) {
      const numLayerRows = layerNum * 4 + 1;
      const startRow = (numRows - 1) / 2 - 2 * layerNum;
      const endRow = startRow + numLayerRows - 1;
      const endRowRule = rowNum !== endRow || layerNum === 0;
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
      if (layerInRow && m3Shift && endRowRule) {
        const tile = layers[layerNum].shift();
        console.log(`Shifting Layer: ${layerNum}, Row: ${rowNum}: ${tile}`);
        row.push(tile);
      }
    }

    // for (let layerNum = layers.length - 1; layerNum >= 0; layerNum--) {
    for (let layerNum = 0; layerNum < layers.length; layerNum++) {
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

      if (layerInRow && m3Shift && rowNum !== startRow) {
        const tile = layers[layerNum].pop();
        console.log(`Popping Layer: ${layerNum}, Row: ${rowNum}: ${tile}`);
        row.push(tile);
      }
    }
  }
  console.log(rows);
}

createBoard(4);
