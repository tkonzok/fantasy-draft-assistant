import { Expose, Transform, Type } from 'class-transformer';
import { Position } from '../components/position/position.component';

export enum PlayerStatus {
  AVAILABLE,
  NOT_AVAILABLE,
  DRAFTED,
}

export class Player {
  @Type(() => String)
  @Expose()
  ovr!: string;

  @Expose()
  pos!: Position;

  @Type(() => String)
  @Expose()
  rank!: string;

  @Type(() => String)
  @Expose()
  tier!: string;

  @Expose()
  @Transform(({ value }) => value ?? false)
  isLastOfTier!: boolean;

  @Type(() => String)
  @Expose()
  name!: string;

  @Type(() => String)
  @Expose()
  team!: string;

  @Type(() => String)
  @Expose()
  bye!: string;

  @Expose()
  @Transform(({ value }) => value ?? PlayerStatus.AVAILABLE)
  status!: PlayerStatus;
}
