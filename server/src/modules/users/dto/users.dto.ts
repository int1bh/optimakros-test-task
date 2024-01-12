/* tslint:disable:max-classes-per-file */
import {ApiProperty, PickType} from '@nestjs/swagger';
import {IsString, IsEmail} from 'class-validator';

export class UsersDto {
    @ApiProperty({ description: 'ФИО', example: 'Иванов Иван Иванович', required: true })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Почта', example: 'Mail@mail.ru', required: true })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Пароль (хэш)', example: 'hjkhkj46ljlkh2', required: true })
    @IsString()
    password: string;
}
export class CreateUsersDto extends PickType(UsersDto, ['name', 'email', 'password']) {};