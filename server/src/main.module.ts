import {Module} from '@nestjs/common';
import { UsersModule } from "./modules/users/users.module";
import { CryptoModule } from "./modules/crypto/crypto.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import config from "./config";
import {CarsModule} from "./modules/cars/cars.module";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    AuthModule,
    CryptoModule,
    UsersModule,
    CarsModule
  ],
})
export class MainModule {}
