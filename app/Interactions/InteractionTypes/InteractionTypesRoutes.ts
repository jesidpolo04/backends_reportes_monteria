import Route from '@ioc:Adonis/Core/Route'

const controllerPath:string = 'Interactions/InteractionTypes/InteractionTypesController';

Route.group(()=>{
    Route.get('/interaction-types', `${controllerPath}.getAll`);
}).middleware(['apiKey'])
