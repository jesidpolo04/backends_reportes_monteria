import ReportTypesRepository from "../Repositories/ReportTypesRepository";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetAllReportTypes from "../UseCases/GetAllReportTypes";
import ReportTypeDto from "../Dtos/ReportTypeDto";
import ReportType from "../ReportType";
import ChangeReportTypeState from "../UseCases/ChangeReportTypeState";
import CreateReportType from "../UseCases/CreateReportType";


export default class ReporTypesController{

    private repository:ReportTypesRepository

    public constructor(){
        this.repository = new ReportTypesRepository();
    }

    public async getAll(ctx:HttpContextContract){
        const getAllReportTypes:GetAllReportTypes = new GetAllReportTypes(this.repository);
        const reportTypes:ReportType[] = await getAllReportTypes.Invoke();
        let reportTypesDtos:ReportTypeDto[] = []
        reportTypes.forEach((reportType:ReportType)=>{
            let reportTypeDto:ReportTypeDto = new ReportTypeDto()
            reportTypeDto.setDtoFromEntity(reportType);
            reportTypesDtos.push(reportTypeDto);
        })
        ctx.response.status(200).send(reportTypesDtos);
    }

    public async create({request, response}: HttpContextContract){
        const { type } = request.body() as { type: string }
        const useCase = new CreateReportType(this.repository)
        const reportType = await useCase.Invoke( type )
        const dto = new ReportTypeDto()
        dto.setDtoFromEntity(reportType)
        response.status(201).send(dto)
    }

    public async changeState({request, response}: HttpContextContract){
        const id = request.param('id') as number
        const useCase = new ChangeReportTypeState(this.repository)
        const reportType = await useCase.Invoke(id)
        const dto = new ReportTypeDto()
        dto.setDtoFromEntity(reportType)
        response.status(200).send(dto)
    }
}