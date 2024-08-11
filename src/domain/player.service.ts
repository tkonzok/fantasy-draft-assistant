import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player, PlayerStatus } from './player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  constructor() {}

  init(players: Player[]): void {
    this.markLastOfTier(players);
    this.playersSubject.next(players);
  }

  draft(player: Player): void {
    const players = this.playersSubject.getValue();
    const playerIndex = players.findIndex((p) => p.name === player.name);

    if (playerIndex !== -1) {
      players[playerIndex].status = PlayerStatus.DRAFTED;
      this.playersSubject.next([...players]);
    }
  }

  remove(player: Player): void {
    const players = this.playersSubject.getValue();
    const playerIndex = players.findIndex((p) => p.name === player.name);

    if (playerIndex !== -1) {
      players[playerIndex].status = PlayerStatus.NOT_AVAILABLE;
      this.playersSubject.next([...players]);
    }
  }

  private markLastOfTier(players: Player[]): void {
    players.forEach((currentPlayer, index) => {
      const nextPlayer = players
        .slice(index + 1)
        .find((next) => next.pos === currentPlayer.pos);
      currentPlayer.isLastOfTier = !(nextPlayer?.tier === currentPlayer.tier);
    });
  }
}
