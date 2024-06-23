import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Player} from "../../domain/player/player";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  standalone: true,
  imports: [
    NgForOf
  ]
})
export class GameComponent {
  @Input() currentPlayer?: Player;
  @Output() buttonClicked = new EventEmitter<number>()
  buttonValues = Array.from({ length: 13 }, (_, i) => i);
}
