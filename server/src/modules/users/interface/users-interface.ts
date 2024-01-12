import {CreateUsersDto, UsersDto} from "../dto/users.dto";
import {User} from "../../../schemas/user.schema";

export interface IUsersService {
    findAll(): Promise<User[]>;
    findUserByEmail(email: string): Promise<User>
    create(recNew: CreateUsersDto): Promise<UsersDto>;
    delete(email: string): Promise<void>;
    changePassword(email: string, recUpdate: UsersDto): Promise<UsersDto>;
}
