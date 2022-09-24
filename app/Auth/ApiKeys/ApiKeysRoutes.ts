import Route from '@ioc:Adonis/Core/Route'

const controllerPath:string = 'Auth/ApiKeys/ApiKeysController';

Route.get('/api-keys', `${controllerPath}.getByKey`);
Route.post('/api-keys', `${controllerPath}.createKey`);