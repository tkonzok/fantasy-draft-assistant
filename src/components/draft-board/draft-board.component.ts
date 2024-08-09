import { Component, OnInit } from '@angular/core';
import {JsonPipe, NgClass, NgForOf} from '@angular/common';
import { Player, PlayerStatus } from '../../domain/player';
import { DraftBoardRowComponent } from './draft-board-row/draft-board-row.component';
import { PlayerService } from '../../domain/player.service';
import {Position} from "../position/position.component";

@Component({
  selector: 'app-draft-board',
  standalone: true,
  imports: [NgForOf, JsonPipe, DraftBoardRowComponent, NgClass],
  templateUrl: './draft-board.component.html',
  styleUrl: './draft-board.component.css',
})
export class DraftBoardComponent implements OnInit {
  players: Player[] = [];
  filteredPlayers: Player[] = [];
  visiblePositions: Set<string> = new Set();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.players$.subscribe((players) => {
      this.players = players.filter(
        (player) => player.status === PlayerStatus.AVAILABLE,
      );
      this.filterPlayers();
    });
  }

  togglePosition(position: Position): void {
    if (this.visiblePositions.has(position)) {
      this.visiblePositions.delete(position);
    } else {
      this.visiblePositions.add(position);
    }
    this.filterPlayers();
  }

  private filterPlayers(): void {
    if (this.visiblePositions.size === 0) {
      this.filteredPlayers = this.players;
    } else {
      this.filteredPlayers = this.players.filter((player) =>
        this.visiblePositions.has(player.pos),
      );
    }
  }

  protected readonly Position = Position;
}
