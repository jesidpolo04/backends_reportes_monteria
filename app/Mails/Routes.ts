import Route from '@ioc:Adonis/Core/Route'

const controllerPath: string = 'Mails/Controller';

Route.group(() => {
    Route.post('/mail', `${controllerPath}.send`);
}).middleware(['apiKey', 'jwt'])

