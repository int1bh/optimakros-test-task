import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CarsService} from "./cars.service";
import {Car, CarSchema} from "../../schemas/car.schema";
import {CarsController} from "./cars.controller";

// модуль для работы с автомобилями
@Module({
    imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
    controllers: [CarsController],
    providers: [CarsService]
})
export class CarsModule {}
