import { Component, Input, OnInit } from '@angular/core';
import {NgClass} from "@angular/common";

export enum Position {
  RB = 'RB',
  WR = 'WR',
  TE = 'TE',
  QB = 'QB',
}

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
  standalone: true,
  imports: [NgClass],
})
export class PositionComponent implements OnInit {
  @Input() pos!: Position;

  getBackgroundClass(): string {
    switch (this.pos) {
      case Position.RB:
        return 'rb-background';
      case Position.WR:
        return 'wr-background';
      case Position.TE:
        return 'te-background';
      case Position.QB:
        return 'qb-background';
      default:
        return '';
    }
  }

  ngOnInit(): void {}
}
