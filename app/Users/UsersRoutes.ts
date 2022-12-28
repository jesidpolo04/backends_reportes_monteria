import Route from '@ioc:Adonis/Core/Route'
import UsersController from './Controllers/UsersController';

const controllerPath:string = 'Users/Controllers/UsersController';
const controller:UsersController = new UsersController()

Route.group(()=>{
    Route.post('/register', `${controllerPath}.register`);
    Route.post('/login', `${controllerPath}.login`)
})
.prefix("/users")

