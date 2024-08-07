import {Component, OnInit} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {csvToJson} from "../../utils/csv-to-json";
import {data1qb} from "../../assets/1qb";
import {plainToInstance} from "class-transformer";
import {Player} from "../../domain/player";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  data: Player[] = [];

  constructor() {}

  ngOnInit(): void {
    const plainData = csvToJson(data1qb);
    this.data = plainToInstance(Player, plainData, {excludeExtraneousValues: true});
  }
}
