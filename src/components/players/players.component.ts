import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Player} from "../../domain/player/player";
import {NgClass, NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgClass
  ]
})
export class PlayersComponent {
  @Input() players: Player[] = [];
  @Input() currentPlayer?: Player;
  @Output() playerAdded = new EventEmitter<string>()

  playerForm = new FormGroup({
    name: new FormControl('')
  });

  addPlayer() {
    const playerName = this.playerForm.get('name')?.value;
    if (playerName) {
      this.playerAdded.emit(playerName)
      this.playerForm.reset();
    }
  }
}
