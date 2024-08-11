import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Player, PlayerStatus } from '../../domain/player';
import { DraftBoardRowComponent } from './draft-board-row/draft-board-row.component';
import { PlayerService } from '../../domain/player.service';
import { Position } from '../position/position.component';
import { FormsModule } from '@angular/forms';
import {BehaviorSubject, combineLatest, Subscription, switchMap} from 'rxjs';

@Component({
  selector: 'app-draft-board',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    DraftBoardRowComponent,
    NgClass,
    FormsModule,
    NgIf,
  ],
  templateUrl: './draft-board.component.html',
  styleUrls: ['./draft-board.component.css'],
})
export class DraftBoardComponent implements OnInit, OnDestroy {
  @Input() set draftPosition(value: number) {
    const pickPositions: number[] = this.getPickPositions(value);
    this.pickPositionsSubject.next(pickPositions);
  }

  private pickPositionsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this.getPickPositions(1));
  private subscriptions: Subscription = new Subscription();
  private totalPlayers: Player[] = [];
  protected availablePlayers: Player[] = [];
  protected filteredPlayers: Player[] = [];
  protected highlightedPlayers: Player[] = [];
  protected showOnlyNextTiers: boolean = false;
  protected searchTerm: string = '';
  protected readonly visiblePositions: Set<string> = new Set();
  protected readonly Position = Position;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    const combined$ = combineLatest([
      this.pickPositionsSubject,
      this.playerService.players$,
    ]);

    this.subscriptions.add(
      combined$.pipe(
        switchMap(([pickPositions, players]) => {
          this.totalPlayers = players;
          this.availablePlayers = players.filter(
            (player) => player.status === PlayerStatus.AVAILABLE
          );
          this.updateHighlightedPlayers(pickPositions);
          this.filterPlayers();
          return [];
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected togglePosition(position: Position): void {
    this.showOnlyNextTiers = false;
    if (this.visiblePositions.has(position)) {
      this.visiblePositions.delete(position);
    } else {
      this.visiblePositions.add(position);
    }
    this.filterPlayers();
  }

  protected toggleTierView() {
    this.visiblePositions.clear();
    this.searchTerm = "";
    this.showOnlyNextTiers = !this.showOnlyNextTiers;
    this.filterPlayers();
  }

  protected filterPlayers(): void {
    if (this.showOnlyNextTiers) {
      const currentTiers: Record<Position, string | undefined> = {
        [Position.QB]: this.getCurrentTier(Position.QB),
        [Position.RB]: this.getCurrentTier(Position.RB),
        [Position.WR]: this.getCurrentTier(Position.WR),
        [Position.TE]: this.getCurrentTier(Position.TE),
      }
      this.filteredPlayers = this.availablePlayers.filter((player) => {
        const matchesPosition =
          this.visiblePositions.size === 0 ||
          this.visiblePositions.has(player.pos);
        const matchesCurrentTier = player.tier === currentTiers[player.pos]
        return matchesPosition && matchesCurrentTier && this.matchesSearchTerm(player);
      });
      return;
    }
    this.filteredPlayers = this.availablePlayers.filter((player) => {
      const matchesPosition =
        this.visiblePositions.size === 0 ||
        this.visiblePositions.has(player.pos);
      return matchesPosition && this.matchesSearchTerm(player);
    });
  }

  protected showAll() {
    this.visiblePositions.clear();
    this.filterPlayers();
  }

  protected clearSearch() {
    this.searchTerm = "";
    this.filterPlayers();
  }

  private updateHighlightedPlayers(pickPositions: number[]): void {
    this.highlightedPlayers = this.determineHighlightedPlayers(
      this.availablePlayers,
      pickPositions,
    );
    this.filterPlayers();
  }

  private determineHighlightedPlayers(
    availablePlayers: Player[],
    pickPositions: number[],
  ) {
    const numberOfTakenPlayers: number = this.totalPlayers.length - availablePlayers.length;
    const currentPick: number = numberOfTakenPlayers + 1;
    return availablePlayers.filter((player: Player, index: number) =>
      pickPositions.some(
        (pickPosition) => pickPosition - currentPick === index,
      ),
    );
  }

  private getPickPositions(
    draftPosition: number,
    totalTeams: number = 12,
    totalRounds: number = 20,
  ): number[] {
    const picks: number[] = [];

    for (let round = 1; round <= totalRounds; round++) {
      const pickInRound =
        round % 2 === 1
          ? (round - 1) * totalTeams + draftPosition
          : round * totalTeams - draftPosition + 1;

      picks.push(pickInRound);
    }

    return picks;
  }

  private matchesSearchTerm(player: Player) {
    let trimmedPlayerName = player.name.toLowerCase().replace(/[^a-zA-Z]/g, '');
    let trimmedSearchTerm = this.searchTerm
      .toLowerCase()
      .replace(/[^a-zA-Z]/g, '');
    return trimmedPlayerName.includes(trimmedSearchTerm);
  }

  private getCurrentTier(position: Position): string | undefined {
    return this.availablePlayers.find((player) => player.pos === position)?.tier
  }
}
