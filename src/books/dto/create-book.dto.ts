import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

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

  @IsDate()
  @IsNotEmpty()
  readonly publishedDate: Date;
}
