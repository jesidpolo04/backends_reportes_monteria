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
import { SearchReportsParameters } from '../SearchReportsParameters';
import { SearchReports } from '../UseCases/SearchReports';
import { GetReportById } from '../UseCases/GetReportById';
import FollowAReport from '../UseCases/FollowAReport';
import UnfollowAReport from '../UseCases/UnfollowAReport';
import { Exception } from '@adonisjs/core/build/standalone';
import { InteractionsRepository } from 'App/Interactions/Repositories/InteractionsRepository';

export default class ReportController {

    private reportsRepository:ReportsRepository
    private interactionsRepository:InteractionsRepository

    public constructor(){
        this.reportsRepository = new ReportsRepository();
        this.interactionsRepository = new InteractionsRepository();
    }

    public async search({response, request}: HttpContextContract){
        const query = request.qs() as SearchReportsParameters
        console.log(query)
        const useCase = new SearchReports(this.reportsRepository)
        const reportsPaginator = await useCase.Invoke(query)
        const reports = reportsPaginator.all()
        const reportsDtos = reports.map(report => {
            return new ReportDto(report)
        })
        response.status(200).send({
            paginator: reportsPaginator.getMeta(),
            reports: reportsDtos
        })
    }

    public async get({request, response}: HttpContextContract){
        const useCase = new GetReportById(this.reportsRepository)
        const id = request.param('id')
        console.log(id)
        if(!id) response.status(400).send({
            message: 'Not id present in the request',
            status: 400
        })
        const report = await useCase.Invoke(id)
        if(report){
            response.status(200).send(new ReportDto(report))
            return
        }
        response.status(404).send(undefined)
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

    public async follow({request, response}:HttpContextContract){
        const reportId = request.param('id')
        if(!reportId){
            throw new Exception('Please, supply a report id', 400)
        }
        const useCase = new FollowAReport(this.reportsRepository, this.interactionsRepository)
        const newFollows = await useCase.Invoke(reportId)
        response.status(200).send({
            follows: newFollows
        })
    }

    public async unfollow({request, response}:HttpContextContract){
        const reportId = request.param('id')
        if(!reportId){
            throw new Exception('Please, supply a report id', 400)
        }
        const useCase = new UnfollowAReport(this.reportsRepository, this.interactionsRepository)
        const newFollows = await useCase.Invoke(reportId)
        response.status(200).send({
            follows: newFollows
        })
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