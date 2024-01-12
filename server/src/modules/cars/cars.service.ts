import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Car} from "../../schemas/car.schema";
import {Model} from "mongoose";
import {CarsDto, CreateCarsDto} from "./dto/cars.dto";

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<Car>
    ) {
    }

    async findAllCars(): Promise<Car[]> {
        return await this.carModel.find().exec();
    }

    async findAllCarsByBrand(name: string): Promise<Car[]> {
        return await this.carModel.find({name: name}).sort({name: 1}).exec();
    }

    async createCar(recNew: CreateCarsDto): Promise<CarsDto> {
        try {
            const createdCar = new this.carModel(recNew);
            return createdCar.save();
        } catch (err) {
            throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteCar(id: string): Promise<void> {
        await this.carModel.findOneAndDelete({_id: id}).exec();
    }

    async changeCar(id: string, recUpdate: CarsDto): Promise<CarsDto> {
        try {
            const updateRecord = await this.carModel.findOne({_id: id});
            if (!updateRecord) {
                throw new HttpException(`Запись для изменения не найдена`, HttpStatus.NOT_FOUND);
            }

            updateRecord.name = recUpdate.name;
            updateRecord.modelName = recUpdate.modelName;
            updateRecord.color = recUpdate.color;
            updateRecord.manufacturedYear = recUpdate.manufacturedYear;
            updateRecord.price = recUpdate.price;

            await this.carModel.updateOne<Car>({_id: id}, updateRecord)
            return updateRecord;
        } catch (err) {
            throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

