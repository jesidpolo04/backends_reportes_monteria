import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database';
import Drive from '@ioc:Adonis/Core/Drive'
import { extname } from 'path'
import CreateReportDto from '../Dtos/CreateReportDto';
import ReportDto from '../Dtos/ReportDto';
import Report from '../Report';
import ReportsRepository from '../Repositories/ReportsRepository'
import CreateReport from '../UseCases/CreateReport';
import GetAllReports from '../UseCases/GetAllReports';
import { reportSchema } from '../Validators/ReportSchema';

export default class ReportController {

    reportsRepository:ReportsRepository

    public constructor(){
        this.reportsRepository = new ReportsRepository();
    }

    public async getAll(ctx: HttpContextContract){
        const queryParams = ctx.request.qs()
        const page = queryParams["page"]
        const limit = queryParams["limit"]
        const getAllReports:GetAllReports = new GetAllReports(this.reportsRepository);
        const paginator:SimplePaginatorContract<Report> = await getAllReports.Invoke(page, limit);
        const reports:Report[] = paginator.all();
        const reportsDto:ReportDto[] = reports.map(report =>{
            let reportDto = new ReportDto(report)
            return reportDto
        })
        ctx.response.status(200).send({
            paginator: paginator.getMeta(),
            reports: reportsDto
        })
    }

    public async create({request, response}: HttpContextContract){
        const validateRequest = await request.validate({schema: reportSchema})
        const createReportDto = new CreateReportDto(validateRequest);
        const useCase = new CreateReport(this.reportsRepository);
        const report = await useCase.Invoke(createReportDto);
        const reportDto = new ReportDto(report)
        response.status(201).send(reportDto)
    }

    public async showImage({ request, response }: HttpContextContract) {
        const fileName = request.param('*').join('/')
        const path = `./images/${fileName}`
        try {
            const { size } = await Drive.getStats(path)
            response.type(extname(path))
            response.header('content-length', size)
            return response.stream(await Drive.getStream(path))
        } catch(e){
            console.log(e)
            response.status(404).send(undefined)
        }
    }
}