import { Component, Input } from '@angular/core';
import { Player } from '../../../domain/player';
import { NgOptimizedImage } from '@angular/common';
import {PositionComponent} from "../../position/position.component";

@Component({
  selector: 'app-team-row',
  standalone: true,
  imports: [NgOptimizedImage, PositionComponent],
  templateUrl: './team-row.component.html',
  styleUrl: './team-row.component.css',
})
export class TeamRowComponent {
  @Input({ required: true }) player!: Player;
}
