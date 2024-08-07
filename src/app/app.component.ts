import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {GameComponent} from "../components/game/game.component";
import {PlayersComponent} from "../components/players/players.component";
import {Player, Status} from "../domain/player/player";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent, PlayersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fantasy-football';
  players: Player[] = [];
  currentPlayerIndex: number = 0;

  constructor() {
    this.initPlayers()
  }

  initPlayers() {
    if (!this.players.length) {
      this.addPlayer("Player 1");
      this.addPlayer("Player 2");
    }
  }

  addPlayer(name: string) {
    const newPlayer = new Player(name.trim())
    this.players.push(newPlayer)
  }

  onButtonClicked(value: number) {
    this.addPoints(value);
    const newScore = this.players[this.currentPlayerIndex].score
    if (newScore === 50) {
      this.setWinner(this.players[this.currentPlayerIndex])
      return
    }
    if (newScore > 50) {
      this.dropTo25()
    }
    if (this.players[this.currentPlayerIndex].points.length > 2 && this.sumOfLastThree(this.players[this.currentPlayerIndex].points) === 0) {
      this.players[this.currentPlayerIndex].setOut()
      this.checkForGameOver()
    }
    this.nextPlayer();
  }

  addPoints(value: number) {
    this.players[this.currentPlayerIndex].addPoints(value);
  }

  dropTo25() {
    this.players[this.currentPlayerIndex].score = 25;
  }

  setWinner(winner: Player) {
    this.players.map((player) => player === winner ? player.setWinner() : player.setOut())
  }

  nextPlayer() {
    if (this.currentPlayerIndex === this.players.length - 1) {
      this.currentPlayerIndex = 0;
      return;
    }
    this.currentPlayerIndex += 1;
    this.checkIfPlayerAlive();
  }

  checkIfPlayerAlive() {
    if (this.players[this.currentPlayerIndex].status === Status.ALIVE) {
      return
    }
    this.nextPlayer()
  }

  checkForGameOver() {
    const alivePlayers = this.players.filter(player => player.status === Status.ALIVE)
    if (alivePlayers.length > 1) {
      return
    }
    this.setWinner(alivePlayers[0])
  }

  sumOfLastThree(arrayOfNumbers: number[]) {
    return arrayOfNumbers.slice(-3).reduce((acc, num) => acc + num, 0);
  }
}
