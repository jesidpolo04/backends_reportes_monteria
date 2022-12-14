import Route from '@ioc:Adonis/Core/Route'

const controllerPath:string = 'Reports/Controllers/ReportsController';

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

Route.get('/reports/image/*', `${controllerPath}.showImage`)
