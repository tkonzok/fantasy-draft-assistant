import { Component, OnInit } from '@angular/core';
import {JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { Player, PlayerStatus } from '../../domain/player';
import { DraftBoardRowComponent } from './draft-board-row/draft-board-row.component';
import { PlayerService } from '../../domain/player.service';
import {Position} from "../position/position.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-draft-board',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    DraftBoardRowComponent,
    NgClass,
    FormsModule,
    NgIf,
  ],
  templateUrl: './draft-board.component.html',
  styleUrl: './draft-board.component.css',
})
export class DraftBoardComponent implements OnInit {
  protected players: Player[] = [];
  protected filteredPlayers: Player[] = [];
  protected searchTerm: string = '';
  protected readonly visiblePositions: Set<string> = new Set();
  protected readonly Position = Position;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.players$.subscribe((players) => {
      this.players = players.filter(
        (player) => player.status === PlayerStatus.AVAILABLE,
      );
      this.clearSearch();
      this.filterPlayers();
    });
  }

  protected togglePosition(position: Position): void {
    if (this.visiblePositions.has(position)) {
      this.visiblePositions.delete(position);
    } else {
      this.visiblePositions.add(position);
    }
    this.filterPlayers();
  }

  protected filterPlayers(): void {
    this.filteredPlayers = this.players.filter((player) => {
      const matchesPosition =
        this.visiblePositions.size === 0 ||
        this.visiblePositions.has(player.pos);
      return matchesPosition && this.matchesSearchTerm(player);
    });
  }

  protected showAll() {
    this.visiblePositions.clear();
    this.filterPlayers();
  }

  protected clearSearch() {
    this.searchTerm = '';
    this.filterPlayers();
  }

  private matchesSearchTerm(player: Player) {
    let trimmedPlayerName = player.name.toLowerCase().replace(/[^a-zA-Z]/g, '');
    let trimmedSearchTerm = this.searchTerm
      .toLowerCase()
      .replace(/[^a-zA-Z]/g, '');
    return trimmedPlayerName.includes(trimmedSearchTerm);
  }
}
