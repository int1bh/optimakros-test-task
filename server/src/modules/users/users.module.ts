import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CryptoModule } from "../crypto/crypto.module";
import { User, UserSchema } from "../../schemas/user.schema";

// модуль для работы с пользователями
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CryptoModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
