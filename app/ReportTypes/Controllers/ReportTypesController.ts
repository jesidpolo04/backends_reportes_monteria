import ReportTypesRepository from "../Repositories/ReportTypesRepository";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetAllReportTypes from "../UseCases/GetAllReportTypes";
import ReportTypeDto from "../Dtos/ReportTypeDto";
import ReportType from "../ReportType";


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
}