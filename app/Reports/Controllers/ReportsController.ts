import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database';
import CreateReportDto from '../Dtos/CreateReportDto';
import ReportDto from '../Dtos/ReportDto';
import Report from '../Report';
import ReportsRepository from '../Repositories/ReportsRepository'
import CreateReport from '../UseCases/CreateReport';
import GetAllReports from '../UseCases/GetAllReports';

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
            let reportDto = new ReportDto()
            reportDto.getDtoFromEntity(report)
            return reportDto
        })
        ctx.response.status(200).send({
            paginator: paginator.getMeta(),
            reports: reportsDto
        })
    }

    public async create(ctx: HttpContextContract){
        const request = ctx.request.all()
        const createReportDto:CreateReportDto = new CreateReportDto();
        createReportDto.setDtoFromRequest(request);
        const createReport:CreateReport = new CreateReport(this.reportsRepository);
        const report:Report = await createReport.Invoke(createReportDto);
        const reportDto:ReportDto = new ReportDto()
        reportDto.getDtoFromEntity(report)
        ctx.response.status(201).send(reportDto)
    }
}