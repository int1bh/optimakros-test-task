import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CreateUsersDto, UsersDto} from "./dto/users.dto";
import {Tools} from "../../common/helper/tools";
import {CryptoService} from "../crypto/crypto.service";
import {ICryptoService} from "../crypto/interface/crypto-interface";
import {IUsersService} from "./interface/users-interface";
import {User} from "../../schemas/user.schema";
import {Model} from "mongoose";

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @Inject(CryptoService) private readonly cryptoService: ICryptoService
        ) {
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({email: email}).exec();
    }

    async create(recNew: CreateUsersDto): Promise<UsersDto> {
        try {
            if (await this.userModel.findOne({email: recNew.email})) {
              throw new HttpException(`Пользователь с таким email уже есть`, HttpStatus.BAD_REQUEST);
            }
            const createdUser = new this.userModel(recNew);
            return createdUser.save();
        } catch (err) {
            throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(email: string): Promise<void> {
        await this.userModel.findOneAndDelete({email: email}).exec();
    }

    async changePassword(email: string, recUpdate: UsersDto): Promise<UsersDto> {
        try {
            const updateRecord = await this.userModel.findOne({email: email});
            if (!updateRecord) {
                throw new HttpException(`Запись для изменения не найдена`, HttpStatus.NOT_FOUND);
            }
            const oldRecord = Tools.cloneObject(updateRecord);
            updateRecord.password = this.cryptoService.cipher(recUpdate.password);

            // если пароль менялся, то сохраняем
            if (oldRecord.password === updateRecord.password) {
                return oldRecord;
            }
            await this.userModel.updateOne<User>({email: email}, updateRecord);
            return updateRecord;
        } catch (err) {
            throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

