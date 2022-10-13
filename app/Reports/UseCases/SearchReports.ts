import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import UseCase from "App/Shared/UseCase";
import Report from "../Report";
import ReportsRepository from "../Repositories/ReportsRepository";
import { SearchReportsParameters } from "../SearchReportsParameters";

export class SearchReports extends UseCase{
    private reportsRepository:ReportsRepository

    public constructor(reportsRepository:ReportsRepository){
        super()
        this.reportsRepository = reportsRepository;
    }

    public async Invoke(searchParameters:SearchReportsParameters):Promise<ModelPaginatorContract<Report>>{
        return await this.reportsRepository.getReportsByParameters(searchParameters)
    }
}