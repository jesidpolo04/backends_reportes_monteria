import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import UseCase from "App/Shared/UseCase";
import Report from "../Report";
import ReportsRepository from "../Repositories/ReportsRepository";

export class GetReportById extends UseCase{
    private reportsRepository:ReportsRepository

    public constructor(reportsRepository:ReportsRepository){
        super()
        this.reportsRepository = reportsRepository;
    }

    public async Invoke(id:number):Promise<Report | undefined | null>{
        return await this.reportsRepository.getReportById(id)
    }
}