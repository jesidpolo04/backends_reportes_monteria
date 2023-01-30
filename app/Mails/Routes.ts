import Route from '@ioc:Adonis/Core/Route'

const controllerPath: string = 'Mails/Controller.ts';

Route.group(() => {
    Route.post('/mail', `${controllerPath}.send`);
}).middleware(['apiKey', 'jwt'])

