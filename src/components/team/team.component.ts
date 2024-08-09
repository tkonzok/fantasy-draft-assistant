import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgForOf } from '@angular/common';
import { TeamRowComponent } from './team-row/team-row.component';
import { DraftBoardRowComponent } from '../draft-board/draft-board-row/draft-board-row.component';
import { Player, PlayerStatus } from '../../domain/player';
import { PlayerService } from '../../domain/player.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgForOf, JsonPipe, TeamRowComponent, DraftBoardRowComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.players$.subscribe((players) => {
      this.players = players.filter(
        (player) => player.status === PlayerStatus.DRAFTED,
      );
    });
  }
}
