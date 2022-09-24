import Database, { SimplePaginatorContract } from "@ioc:Adonis/Lucid/Database";
import Report from "../Report";

export default class ReportsRepository{

    public async getAllReports(page = 1, limit = 10):Promise<SimplePaginatorContract<Report>>{
        let allReports:SimplePaginatorContract<Report> = await Database.from('reports').paginate(page, limit)
        allReports.baseUrl('/reports')
        return allReports;
    }

    public async saveReport(report:Report):Promise<Report>{
       return report.save();
    }
}