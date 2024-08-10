import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../../domain/player';
import { NgOptimizedImage } from '@angular/common';
import { PlayerService } from '../../../domain/player.service';
import {PositionComponent} from "../../position/position.component";
import {TeamComponent} from "../../team/team.component";
import {ByeComponent} from "../../bye/bye.component";

@Component({
  selector: 'app-draft-board-row',
  standalone: true,
  imports: [NgOptimizedImage, PositionComponent, TeamComponent, ByeComponent],
  templateUrl: './draft-board-row.component.html',
  styleUrl: './draft-board-row.component.css',
})
export class DraftBoardRowComponent {
  @Input({ required: true }) player!: Player;

  constructor(private playerService: PlayerService) {}

  draft(): void {
    this.playerService.draft(this.player);
  }

  remove(): void {
    this.playerService.remove(this.player);
  }
}
