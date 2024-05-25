import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly biography: string;

    @IsDateString()
    @IsNotEmpty()
    readonly dateOfBirth: Date;
}
