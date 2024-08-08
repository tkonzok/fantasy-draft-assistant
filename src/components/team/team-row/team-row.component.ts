import {Component, Input} from '@angular/core';
import {Player} from "../../../domain/player";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-team-row',
    standalone: true,
  imports: [
    NgOptimizedImage
  ],
    templateUrl: './team-row.component.html',
    styleUrl: './team-row.component.css'
})
export class TeamRowComponent {
    @Input({required: true}) player!: Player;
}
