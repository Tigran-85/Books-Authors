import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
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
