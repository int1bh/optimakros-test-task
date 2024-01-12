import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingTimeInterceptor } from '../../common/interceptors/logging-time.interceptor';
import {CarsService} from "./cars.service";
import {CarsDto, CreateCarsDto} from "./dto/cars.dto";
import {Car} from "../../schemas/car.schema";
import {AuthenticatedGuard} from "../../common/guards/authenticated.guard";

@Controller('cars')
@UseInterceptors(LoggingTimeInterceptor)
@ApiTags('Автомобили')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}
    @Get()
    @ApiOperation({ summary: 'Получить все автомобили' })
    @ApiResponse({ status: 200, description: 'Данные получены успешно', type: CarsDto, isArray: true })
    async findAllCars(): Promise<Car[]> {
        return await this.carsService.findAllCars();
    }

    @Get('by-brand/:name')
    @ApiOperation({ summary: 'Получить все автомобили по бренду' })
    @ApiResponse({ status: 200, description: 'Данные получены успешно', type: CarsDto, isArray: true })
    @ApiParam({ name: 'name', required: true, type: 'string', description: 'Идентификатор записи' })
    async findAllCarsByBrand(@Param('name') name: string): Promise<Car[]> {
        return await this.carsService.findAllCarsByBrand(name);
    }

    @UseGuards(AuthenticatedGuard)
    @Post()
    @ApiOperation({ summary: 'Добавить автомобиль' })
    @ApiResponse({ status: 201, description: 'Запись успешно создана', type: CarsDto })
    async createCar(@Body() createCarsDto: CreateCarsDto): Promise<CarsDto> {
        return await this.carsService.createCar(createCarsDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Изменить запись' })
    @ApiResponse({ status: 200, description: 'Запись успешно изменена', type: CarsDto })
    @ApiParam({ name: 'id', required: true, type: 'string', description: 'Идентификатор записи' })
    async changeCar(@Param('id') id: string, @Body() updateCarsDto: CarsDto): Promise<CarsDto> {
        return await this.carsService.changeCar(id, updateCarsDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Удалить автомобиль' })
    @ApiResponse({ status: 200, description: 'Запись успешно удалена' })
    @ApiParam({ name: 'id', required: true, type: 'string', description: 'id' })
    async deleteCar(@Param('id') id: string): Promise<void> {
        return await this.carsService.deleteCar(id);
    }
}
