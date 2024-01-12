/* tslint:disable:max-classes-per-file */
import {ApiProperty, PickType} from '@nestjs/swagger';
import {IsString, IsNumber, IsOptional} from 'class-validator';

export class CarsDto {
    @ApiProperty({ description: 'Брэнд', example: 'Toyota', required: true })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Модель (название)', example: 'Land Cruiser', required: true })
    @IsString()
    modelName: string;

    @ApiProperty({ description: 'Цвет', example: 'Красный' })
    @IsString()
    @IsOptional()
    color: string;

    @ApiProperty({ description: 'Год производства', example: 2024, required: true })
    @IsNumber()
    manufacturedYear: number;

    @ApiProperty({ description: 'Цена', example: 100500 })
    @IsNumber()
    @IsOptional()
    price: number;
}
export class CreateCarsDto extends PickType(CarsDto, ['name', 'modelName', 'color', 'manufacturedYear', 'price']) {};