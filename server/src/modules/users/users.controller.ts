import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { ApiParam, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingTimeInterceptor } from '../../common/interceptors/logging-time.interceptor';
import { CreateUsersDto, UsersDto } from "./dto/users.dto";
import { UsersService } from "./users.service";
import { LocalAuthGuard } from "../../common/guards/local.auth.guard";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { LoginUserDto } from "./dto/login.dto";
import {User} from "../../schemas/user.schema";

@Controller('users')
@UseInterceptors(LoggingTimeInterceptor)
@ApiTags('Пользователи')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @UseGuards(AuthenticatedGuard)
    @Get()
    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, description: 'Данные получены успешно', type: UsersDto, isArray: true })
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Post('signup')
    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({ status: 201, description: 'Запись успешно создана', type: UsersDto })
    async create(@Body() createUsersDto: CreateUsersDto): Promise<UsersDto> {
        return await this.usersService.create(createUsersDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Put(':email')
    @ApiOperation({ summary: 'Изменить запись' })
    @ApiResponse({ status: 200, description: 'Запись успешно изменена', type: UsersDto })
    @ApiParam({ name: 'email', required: true, type: 'string', description: 'Идентификатор записи' })
    async changePassword(@Param('email') email: string, @Body() updateUsersDto: UsersDto): Promise<UsersDto> {
        return await this.usersService.changePassword(email, updateUsersDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete(':email')
    @ApiOperation({ summary: 'Удалить пользователя' })
    @ApiResponse({ status: 200, description: 'Запись успешно удалена' })
    @ApiParam({ name: 'email', required: true, type: 'string', description: 'email' })
    async removeUser(@Param('email') email: string): Promise<void> {
        return await this.usersService.delete(email);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Вход пользователя' })
    login(@Req() req, @Body() loginUserDto: LoginUserDto): any {
        return { msg: 'Пользователь вошёл' };
    };

    @Get('logout')
    @ApiOperation({ summary: 'Выход пользователя' })
    logout(@Req() req): any {
        req.session.destroy()
        return { msg: 'Пользователь вышел' }
    }
}
