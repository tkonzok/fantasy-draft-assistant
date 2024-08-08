import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {csvToJson} from "../../utils/csv-to-json";
import {data1qb} from "../../assets/1qb";
import {plainToInstance} from "class-transformer";
import {Player} from "../../domain/player";
import {DraftBoardRowComponent} from "./draft-board-row/draft-board-row.component";

@Component({
  selector: 'app-draft-board',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    DraftBoardRowComponent,
  ],
  templateUrl: './draft-board.component.html',
  styleUrl: './draft-board.component.css',
})
export class DraftBoardComponent implements OnInit {
  allPlayers: Player[] = [];
  availablePlayers: Player[] = [];
  @Output() selectPlayer = new EventEmitter<Player>();

  constructor() {}

  ngOnInit(): void {
    const plainData = csvToJson(data1qb);
    this.allPlayers = plainToInstance(Player, plainData, {excludeExtraneousValues: true});
    this.availablePlayers = this.allPlayers;
  }

  onSelectPlayer(player: Player) {
    this.selectPlayer.emit(player)
    this.availablePlayers = this.availablePlayers.filter((availablePlayer: Player) => availablePlayer !== player)
  }
}
