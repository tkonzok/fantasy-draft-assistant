import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";
import { Player, PlayerStatus } from "./player";
import { HttpClient } from "@angular/common/http";
import { plainToInstance } from "class-transformer";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  public static readonly PLAYER_URL: string =
    "http://localhost:3000/api/players";
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  constructor(private http: HttpClient) {}

  init(): void {
    this.http
      .get<Player[]>(PlayerService.PLAYER_URL)
      .pipe(
        map((value) => plainToInstance(Player, value)),
        tap((players: Player[]) => {
          this.markLastOfTier(players);
          this.playersSubject.next(players);
        }),
      )
      .subscribe();
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
