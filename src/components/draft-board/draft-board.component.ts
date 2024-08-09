import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgForOf } from '@angular/common';
import { Player, PlayerStatus } from '../../domain/player';
import { DraftBoardRowComponent } from './draft-board-row/draft-board-row.component';
import { PlayerService } from '../../domain/player.service';

@Component({
  selector: 'app-draft-board',
  standalone: true,
  imports: [NgForOf, JsonPipe, DraftBoardRowComponent],
  templateUrl: './draft-board.component.html',
  styleUrl: './draft-board.component.css',
})
export class DraftBoardComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.players$.subscribe((players) => {
      this.players = players.filter(
        (player) => player.status === PlayerStatus.AVAILABLE,
      );
    });
  }
}
