import Route from '@ioc:Adonis/Core/Route'

const controllerPath:string = 'ReportTypes/Controllers/ReportTypesController';

Route.get('/report-types', `${controllerPath}.getAll`);