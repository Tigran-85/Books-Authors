import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly biography: string;

    @IsDate()
    @IsNotEmpty()
    readonly dateOfBirth: Date;
}
