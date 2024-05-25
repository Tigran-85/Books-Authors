import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsNumber()
  @IsNotEmpty()
  readonly authorId: number;
  
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly ISBN: string;

  @IsDateString()
  @IsNotEmpty()
  readonly publishedDate: Date;
}
