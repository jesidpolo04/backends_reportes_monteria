import CreateReportDto from "../Dtos/CreateReportDto";
import Report from "../Report";
import ReportsRepository from "../Repositories/ReportsRepository";
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateReport{
    private reportsRepository:ReportsRepository

    public constructor(reportsRepository:ReportsRepository){
        
        this.reportsRepository = reportsRepository;
    }
    
    public async Invoke(request:CreateReportDto):Promise<Report>{
        return await this.reportsRepository.saveReport(request.getReportFromDto());
    }
}