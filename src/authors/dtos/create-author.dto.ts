import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateAuthorDto {
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
