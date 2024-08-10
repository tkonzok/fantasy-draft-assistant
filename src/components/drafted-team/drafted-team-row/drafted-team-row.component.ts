import { Component, Input } from '@angular/core';
import { Player } from '../../../domain/player';
import { NgOptimizedImage } from '@angular/common';
import {PositionComponent} from "../../position/position.component";

@Component({
  selector: 'app-drafted-team-row',
  standalone: true,
  imports: [NgOptimizedImage, PositionComponent],
  templateUrl: './drafted-team-row.component.html',
  styleUrl: './drafted-team-row.component.css',
})
export class DraftedTeamRowComponent {
  @Input({ required: true }) player!: Player;
}
