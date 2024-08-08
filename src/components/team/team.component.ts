import {Component, Input} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {TeamRowComponent} from "./team-row/team-row.component";
import {DraftBoardRowComponent} from "../draft-board/draft-board-row/draft-board-row.component";
import {Player} from "../../domain/player";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    TeamRowComponent,
    DraftBoardRowComponent,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  @Input() players: Player[] = [];
  constructor() {}
}
