import {Expose, plainToInstance, Type} from 'class-transformer';

export class Player {
  @Type(() => String)
  @Expose()
  ovr!: string;

  @Type(() => String)
  @Expose()
  pos!: string;

  @Type(() => String)
  @Expose()
  rank!: string;

  @Type(() => String)
  @Expose()
  name!: string;

  @Type(() => String)
  @Expose()
  team!: string;

  @Type(() => String)
  @Expose()
  bye!: string;
}
