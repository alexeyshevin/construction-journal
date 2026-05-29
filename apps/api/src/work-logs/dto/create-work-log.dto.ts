import { IsDateString, IsNumber, IsPositive, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateWorkLogDto {
  @IsDateString()
  workDate!: string;

  @IsUUID()
  workTypeId!: string;

  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsString()
  @MinLength(1)
  unit!: string;

  @IsString()
  @MinLength(2)
  performerName!: string;
}