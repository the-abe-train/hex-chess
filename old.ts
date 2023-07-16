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

class Board {
  sideLength: number;

  spots: {
    0: string[][];
    1: string[][];
  };

  constructor(sideLength: number) {
    this.sideLength = sideLength;
    this.spots = {
      0: [...new Array(sideLength)].map((_) => [...new Array(sideLength)]),
      1: [...new Array(sideLength)].map((_) => [...new Array(sideLength)]),
    };

    const halfLength = sideLength / 2;
    for (let r = -halfLength; r < halfLength; r++) {
      for (let c = 0; c < sideLength; c++) {
        const spot = new Spot(0, r, c);
        const value = `(0 ${r} ${c})`;
        this.setSpot(spot, value);
      }
      for (let c = -halfLength; c < sideLength; c++) {
        const spot = new Spot(1, r, c);
        const value = `(1 ${r} ${c})`;
        this.setSpot(spot, value);
      }
    }
  }

  setSpot(spot: Spot, value: string) {
    const { a, r, c } = spot;
    this.spots[a][r][c] = value;
  }

  getSpot(spot: Spot) {
    const { a, r, c } = spot;
    return this.spots[a][r][c];
  }

  showBoard() {
    const rows = [];
    for (let r = 0; r < this.sideLength; r++) {
      const row0 = [];
      for (let c = 0; c < this.sideLength; c++) {
        const spot = new Spot(0, r, c);
        const value = this.getSpot(spot);
        row0.push(value);
      }
      rows.push(row0.join(" "));
      const row1 = [];
      for (let c = 0; c < this.sideLength; c++) {
        const spot = new Spot(1, r, c);
        const value = this.getSpot(spot);
        row1.push(value);
      }
      rows.push(row1.join(" "));
    }
    const honeycomb = rows.join("\n");
    console.log(honeycomb);
  }
}

const board = new Board(5);
board.showBoard();

/*
Side length is 6

a1: 1, 3, 


*/
