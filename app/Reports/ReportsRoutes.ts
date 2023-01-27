import Route from '@ioc:Adonis/Core/Route'

const controllerPath:string = 'Reports/Controllers/ReportsController';
const controllerSimulatePath:string = 'Reports/Controllers/ReportsSimulateController';

Route.group(()=>{
    Route.get('/report/:id', `${controllerPath}.get`)
    Route.get('/reports', `${controllerPath}.getAll`);
    Route.get('/reports/search', `${controllerPath}.search`);
    Route.post('/reports', `${controllerPath}.create`);

    Route.group (()=>{
        Route.put('/report/:id/follow', `${controllerPath}.follow`)
        Route.put('/report/:id/unfollow', `${controllerPath}.unfollow`)
    }).middleware(['jwt'])
    
}).middleware(['apiKey'])


Route.group(()=>{
    Route.post('/reports', `${controllerSimulatePath}.simulate`)
}).prefix('/simulate')

Route.get('/reports/image/*', `${controllerPath}.showImage`)
