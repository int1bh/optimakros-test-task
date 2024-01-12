import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CarsController } from '../../../src/modules/cars/cars.controller';
import { CarsService } from '../../../src/modules/cars/cars.service';
import carsServiceMock, { mockCreateRec, mockUpdateRec } from './car.service.mock';

describe('CarsModule (e2e)', () => {
    let app: INestApplication;
    const id = 'sfhgndfbgs5';
    const name = 'Toyota'

    beforeAll(async () => {
        const mockCarsModule: TestingModule = await Test.createTestingModule({
            controllers: [CarsController],
            providers: [CarsService]
        })
            .overrideProvider(CarsService)
            .useValue(carsServiceMock)
            .compile();
        app = mockCarsModule.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
        await app.init();
    });

    it('/cars (GET)', () => {
        return request(app.getHttpServer())
            .get('/cars')
            .expect(HttpStatus.OK)
            .expect(carsServiceMock.findAllCars);
    });

    it('/cars/by-brand/:name (GET)', () => {
        return request(app.getHttpServer())
            .get(`/cars/by-brand/${name}`)
            .expect(HttpStatus.OK)
            .expect(carsServiceMock.findAllCarsByBrand(name));
    });

    it('/cars (POST)', () => {
        return request(app.getHttpServer())
            .post(`/cars`)
            .send(mockCreateRec)
            .expect(HttpStatus.CREATED)
            .expect(carsServiceMock.createCar(mockCreateRec));
    });

    it('/cars/:id  (PUT)', () => {
        return request(app.getHttpServer())
            .put(`/cars/${id}`)
            .send(mockUpdateRec)
            .expect(HttpStatus.OK)
            .expect(carsServiceMock.changeCar(id, mockUpdateRec));
    });

    it('/cars/:id  (DELETE)', () => {
        return request(app.getHttpServer()).delete(`/cars/${id}`).expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
