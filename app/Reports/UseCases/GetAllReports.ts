import ReportsRepository from "../Repositories/ReportsRepository";
import Report from "../Report";
import { SimplePaginatorContract } from "@ioc:Adonis/Lucid/Database";
import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";

export default class GetAllReports{

    private reportsRepository:ReportsRepository

    public constructor(reportsRepository:ReportsRepository){
        this.reportsRepository = reportsRepository;
    }

    public async Invoke(page = 1, limit = 10):Promise<ModelPaginatorContract<Report>>{
        let reports = await this.reportsRepository.getAllReports(page, limit);
        return reports
    }
}