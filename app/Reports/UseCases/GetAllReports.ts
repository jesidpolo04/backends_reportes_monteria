import ReportsRepository from "../Repositories/ReportsRepository";
import Report from "../Report";
import { SimplePaginatorContract } from "@ioc:Adonis/Lucid/Database";

export default class GetAllReports{

    private reportsRepository:ReportsRepository

    public constructor(reportsRepository:ReportsRepository){
        this.reportsRepository = reportsRepository;
    }

    public async Invoke(page = 1, limit = 10):Promise<SimplePaginatorContract<Report>>{
        let reports = await this.reportsRepository.getAllReports(page, limit);
        return reports
    }
}