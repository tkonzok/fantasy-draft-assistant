export enum Status {
  ALIVE = "ALIVE",
  OUT = "OUT",
  WINNER = "WINNER",
}

export class Player {
  name: string;
  points: number[];
  score: number;
  status: Status;
  misses: string;

  constructor(name: string) {
    this.name = name;
    this.points = [];
    this.score = 0
    this.status = Status.ALIVE
    this.misses = ""
  }

  addPoints(value: number) {
    this.points.push(value)
    if (value === 0) {
      this.misses += "X "
      return
    }
    this.misses = ""
    this.score += value
  }

  setWinner() {
    this.status = Status.WINNER;
  }

  setOut() {
    this.status = Status.OUT;
  }
}
