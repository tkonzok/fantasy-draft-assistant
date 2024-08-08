import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Player} from "../../../domain/player";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-draft-board-row',
    standalone: true,
  imports: [
    NgOptimizedImage
  ],
    templateUrl: './draft-board-row.component.html',
    styleUrl: './draft-board-row.component.css'
})
export class DraftBoardRowComponent {
    @Input({required: true}) player!: Player;
    @Output() select = new EventEmitter<void>();
}
