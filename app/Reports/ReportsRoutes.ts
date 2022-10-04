import Route from '@ioc:Adonis/Core/Route'

const controllerPath:string = 'Reports/Controllers/ReportsController';

Route.group(()=>{
    Route.get('/reports', `${controllerPath}.getAll`);
    Route.post('/reports', `${controllerPath}.create`);
}).middleware(['apiKey'])

Route.get('/reports/image/*', `${controllerPath}.showImage`)
