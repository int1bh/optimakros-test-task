import axios from 'axios';
import * as process from 'node:process';
import configs from "./config";

import * as readLine from 'node:readline';

let cookie = '';
let t = '';

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

type User = {
    name: string,
    email: string,
    password: string
}

type Car = {
    name: string,
    modelName: string,
    color: string,
    manufacturedYear: number,
    price: number
}
// создание пользователя
async function createUser(args: Array<string>): Promise<void> {
    try {
        if(args.length < 5) {
            console.log('Некорректный ввод');
            return;
        }
        const user: User = {
            name: args[0] + ' ' + args[1] + ' ' + args[2],
            email: args[3],
            password: args[4].toString()
        }
        const resp = await axios.post(configs.url +'users/signup', user);
        console.log(resp.statusText);
    } catch (e) {
        console.error(e.response.data.message);
    }
}

// login
async function login(args: Array<string>): Promise<any> {
    try {
        const resp =  await axios.post(configs.url +'users/login', {
            email: args[0],
            password: args[1].toString()
        });
        cookie = resp.headers['set-cookie'][0].split(';')[0];
        console.log(resp.data.msg);
    } catch (e) {
        console.error(e.response.data.message);
    }
}

async function logout(): Promise<void> {
    try {
        const resp = await axios.get(configs.url +'users/logout');
        console.log(resp.data.msg);
    } catch (e) {
        console.error(e.response.data.message);
    }
}

async function changePassword(args: Array<string>): Promise<void> {
    try {
        const resp = await axios.put(configs.url +'users/' + args[0], {
            password: args[1].toString()
        }, { headers: { Cookie: cookie } });
        console.log(resp.statusText);
    } catch (e) {
        console.error(e.response.data.message);
    }
}
async function viewAllCars(): Promise<void> {
    const cars = await axios.get(configs.url +'cars');
    console.log(cars.data);
}

async function viewAllCarsByBrand(args: Array<string>): Promise<void> {
    const cars = await axios.get(configs.url +'cars/by-brand/'+args[0]);
    console.log(cars.data);
}
async function createCar(args: Array<string>): Promise<void> {
    try {
        if(args.length < 5) {
            console.log('Некорректный ввод')
            return;
        }
        const car: Car = {
            name: args[0],
            modelName: args[1].toString(),
            color: args[2],
            manufacturedYear: Number(args[3]),
            price: Number(args[4])
        }
        const resp = await axios.post(configs.url +'cars', car, { headers: { Cookie: cookie } });
        console.log(resp.statusText);
    } catch (e) {
        console.error(e.response.data.message);
    }
}

async function changeCar(args: Array<string>): Promise<void> {
    try {
        if(args.length < 6) {
            console.log('Некорректный ввод');
            return;
        }
        const editCar: Car = {
            name: args[1],
            modelName: args[2].toString(),
            color: args[3],
            manufacturedYear: Number(args[4]),
            price: Number(args[5])
        }
        const resp = await axios.put(configs.url +'cars/' + args[0], editCar, { headers: { Cookie: cookie } });
        console.log(resp.statusText);
    } catch (e) {
        console.error(e.response.data.message);
    }
}

async function deleteCar(args: Array<string>): Promise<void> {
    try {
        const resp = await axios.delete(configs.url +'cars/' + args[0], { headers: { Cookie: cookie } });
        console.log(resp.statusText);
    } catch (e) {
        console.error(e.response.data.message);
    }

}
async function executeCommand(command, args): Promise<void> {
    switch (command) {
        case 'help':
            console.table(helpInfo);
            break;
        case 'useradd':
            await createUser(args);
            break;
        case 'login':
            await login(args);
            break;
        case 'logout':
            await logout();
            break;
        case 'passwd':
            await changePassword(args);
            break;
        case 'allcars':
            await viewAllCars();
            break;
        case 'filtercars':
            await viewAllCarsByBrand(args);
            break;
        case 'addcar':
            await createCar(args);
            break;
        case 'editcar':
            await changeCar(args);
            break;
        case 'deletecar':
            await deleteCar(args);
            break;
        case 'exit':
            console.log('Выход из программы');
            process.exit()
        default:
            console.log('Неизвестная команда. help для вызова справки');
    }
}

const helpInfo: Object[] = [
    { ['Команда']: 'help', ['Описание']: 'Вывести справку' },
    { ['Команда']: 'exit', ['Описание']: 'Выход' },
    { ['Команда']: 'useradd <ФИО> <email> <password>', ['Описание']: 'Зарегистрировать пользователя' },
    { ['Команда']: 'login <email> <password>', ['Описание']: 'Войти' },
    { ['Команда']: 'logout', ['Описание']: 'Выйти' },
    { ['Команда']: 'passwd <email> <password>', ['Описание']: 'Изменить пароль' },
    { ['Команда']: 'allcars', ['Описание']: 'Просмотреть все автомобили' },
    { ['Команда']: 'filtercars <марка>', ['Описание']: 'Просмотреть все автомобили выбранной марки' },
    { ['Команда']: 'addcar <марка> <модель> <цвет> <год_выпуска> <цена>', ['Описание']: 'Добавить автомобиль' },
    { ['Команда']: 'editcar <id> <марка> <модель> <цвет> <год_выпуска> <цена>', ['Описание']: 'Изменить автомобиль' },
    { ['Команда']: 'deletecar <id>', ['Описание']: 'Удалить автомобиль' },
]
function commandLineInterpreter(): void {
    rl.question('<Optimacross> ', (input) => {
        const [command, ...args] = input.split(' ');
        executeCommand(command, args);
        if (command !== 'exit') commandLineInterpreter(); // Разрешение на новый ввод команды
    });
}

console.log('Добро пожаловать в программу-клиент Optimacros');
console.table(helpInfo);
commandLineInterpreter();

