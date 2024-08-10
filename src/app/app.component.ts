import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DraftBoardComponent } from '../components/draft-board/draft-board.component';
import { DraftedTeamComponent } from '../components/drafted-team/drafted-team.component';
import { Player } from '../domain/player';
import { csvToJson } from '../utils/csv-to-json';
import { data1qb } from '../assets/1qb';
import { plainToInstance } from 'class-transformer';
import { PlayerService } from '../domain/player.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DraftBoardComponent, DraftedTeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent implements OnInit {
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    const plainData = csvToJson(data1qb);
    const initialPlayers: Player[] = plainToInstance(Player, plainData, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
    this.playerService.init(initialPlayers);
  }
}
