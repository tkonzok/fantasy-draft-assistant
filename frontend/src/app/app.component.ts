import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DraftBoardComponent } from "../components/draft-board/draft-board.component";
import { DraftedTeamComponent } from "../components/drafted-team/drafted-team.component";
import { PlayerService } from "../domain/player.service";
import { NgClass, NgForOf } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { SettingsService } from "../domain/settings.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    DraftBoardComponent,
    DraftedTeamComponent,
    NgClass,
    NgForOf,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  providers: [],
})
export class AppComponent implements OnInit {
  protected draftPosition: number = 1;
  protected totalDraftPositions: number = 12;
  protected availableSettings: string[] = [];
  protected selectedSetting: string = "";

  constructor(
    private playerService: PlayerService,
    private settingsService: SettingsService,
  ) {
    this.availableSettings = settingsService.availableSettings;
    this.selectedSetting = this.availableSettings[0];
  }

  ngOnInit(): void {
    this.playerService.init();
    this.settingsService.selectedSetting$.subscribe((setting) => {
      this.selectedSetting = setting;
    });
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

  protected incrementTotalDraftPositions() {
    if (this.totalDraftPositions < 12) {
      this.totalDraftPositions++;
    }
  }

  protected decrementTotalDraftPositions() {
    if (this.totalDraftPositions > 1) {
      this.totalDraftPositions--;
    }
  }

  protected selectSetting(setting: string) {
    this.settingsService.selectSetting(setting);
  }
}
