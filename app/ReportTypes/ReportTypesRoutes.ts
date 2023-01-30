import Route from '@ioc:Adonis/Core/Route'

const controllerPath: string = 'ReportTypes/Controllers/ReportTypesController';

Route.group(() => {

    Route.get('/report-types', `${controllerPath}.getAll`);
    Route.group(() => {
        //This requests require JWT authenticacion
        Route.put('/report-type/:id', `${controllerPath}.changeState`);
        Route.post('/report-types', `${controllerPath}.create`);
    })

}).middleware(['apiKey'])

