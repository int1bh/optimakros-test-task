import {CarsDto, CreateCarsDto} from '../../../src/modules/cars/dto/cars.dto';
export const mockRec: CarsDto = {
    name: 'Toyota',
    modelName: 'Aristo',
    color: 'Красный',
    manufacturedYear: 2000,
    price: 100000
};

export const mockCreateRec: CreateCarsDto = {
    name: 'Toyota',
    modelName: 'Aristo',
    color: 'Красный',
    manufacturedYear: 2000,
    price: 100000
};

export const mockUpdateRec: CarsDto = {
    name: 'Toyota',
    modelName: 'Aristo',
    color: 'Красный',
    manufacturedYear: 2000,
    price: 100000
};

export default {
    findAllCars: () => [mockRec],
    findAllCarsByBrand: (name) => [mockRec].filter(el => el.name === name),
    createCar: (rec) => ({ ...rec, id: 'sfhgndfbgs5' }),
    changeCar: (id, rec) => rec,
    deleteCar: (id) => {},
};