import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DraftBoardComponent} from "../components/draft-board/draft-board.component";
import {TeamComponent} from "../components/team/team.component";
import {Player} from "../domain/player";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DraftBoardComponent, TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {
  title = 'fantasy-football';
  players: Player[] = [];

  constructor() {}

  protected playerSelected(player: Player) {
    this.players.push(player);
  }
}
