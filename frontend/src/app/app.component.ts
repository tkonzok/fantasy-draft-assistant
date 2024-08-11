import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DraftBoardComponent } from "../components/draft-board/draft-board.component";
import { DraftedTeamComponent } from "../components/drafted-team/drafted-team.component";
import { Player } from "../domain/player";
import { csvToJson } from "../../../api/src/utils/csv-to-json";
import { plainToInstance } from "class-transformer";
import { PlayerService } from "../domain/player.service";
import { dataHppr1qb } from "../assets/rankings/data_hppr_1qb";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, DraftBoardComponent, DraftedTeamComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  providers: [],
})
export class AppComponent implements OnInit {
  protected draftPosition: number = 1;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.init();
  }

  protected incrementDraftPosition() {
    if (this.draftPosition < 12) {
      this.draftPosition++;
    }
  }

  protected decrementDraftPosition() {
    if (this.draftPosition > 1) {
      this.draftPosition--;
    }
  }
}
