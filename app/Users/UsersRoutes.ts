import Route from '@ioc:Adonis/Core/Route'

const controllerPath:string = 'Users/Controllers/UsersController';

Route.group(()=>{

    Route.post('/register', `${controllerPath}.register`);
    Route.post('/login', `${controllerPath}.login`)

})
.prefix("/users")
.middleware(['apiKey'])

