import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import carsServiceMock, {mockCreateRec, mockUpdateRec} from '../../../test/modules/cars/car.service.mock';

describe('CarsController', () => {
    let carsController: CarsController;
    let spyCarsService: CarsService;
    const id = 'sfhgndfbgs5';
    const name = 'Toyota'

    const CarsServiceProvider = {
        provide: CarsService,
        useFactory: () => ({
            findAllCars: jest.fn(carsServiceMock.findAllCars),
            findAllCarsByBrand: jest.fn(carsServiceMock.findAllCarsByBrand),
            createCar: jest.fn(carsServiceMock.createCar),
            changeCar: jest.fn(carsServiceMock.changeCar),
            deleteCar: jest.fn(carsServiceMock.deleteCar)
        })
    };


    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CarsController],
            providers: [CarsServiceProvider]
        }).compile();

        carsController = app.get<CarsController>(CarsController);
        spyCarsService = app.get<CarsService>(CarsService);
    });

    it('CarsController существует', () => {
        expect(carsController).toBeDefined();
    });

    it('Метод findAllCars был вызван', async () => {
        const result = await carsController.findAllCars();
        expect(result).toStrictEqual(carsServiceMock.findAllCars());
        expect(spyCarsService.findAllCars).toHaveBeenCalled();
    });

    it('Метод findAllCarsByBrand был вызван', async () => {
        const result = await carsController.findAllCarsByBrand(name);
        expect(result).toStrictEqual(carsServiceMock.findAllCarsByBrand(name));
        expect(spyCarsService.findAllCarsByBrand).toHaveBeenCalled();
        expect(spyCarsService.findAllCarsByBrand).toHaveBeenCalledWith(name);
    });

    it('Метод createCar был вызван', async () => {
        const result = await carsController.createCar(mockCreateRec);
        expect(result).toStrictEqual(carsServiceMock.createCar(mockCreateRec));
        expect(spyCarsService.createCar).toHaveBeenCalled();
        expect(spyCarsService.createCar).toHaveBeenCalledWith(mockCreateRec);
    });

    it('Метод changeCar был вызван', async () => {
        const result = await carsController.changeCar(id, mockUpdateRec);
        expect(result).toStrictEqual(carsServiceMock.changeCar(id, mockUpdateRec));
        expect(spyCarsService.changeCar).toHaveBeenCalled();
        expect(spyCarsService.changeCar).toHaveBeenCalledWith(id, mockUpdateRec);
    });

    it('Метод deleteCar был вызван', async () => {
        await carsController.deleteCar(id);
        expect(spyCarsService.deleteCar).toHaveBeenCalled();
        expect(spyCarsService.deleteCar).toHaveBeenCalledWith(id);
    });
});
