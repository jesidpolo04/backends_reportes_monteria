import Database, { SimplePaginatorContract } from "@ioc:Adonis/Lucid/Database";
import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import { Query } from "accesscontrol";
import Report from "../Report";
import { SearchReportsParameters } from "../SearchReportsParameters";

export default class ReportsRepository{

    public async getAllReports(page = 1, limit = 10):Promise<SimplePaginatorContract<Report>>{
        let allReports:SimplePaginatorContract<Report> = await Database.from('reports').paginate(page, limit)
        allReports.baseUrl('/reports')
        return allReports;
    }

    public async getReportsByParameters
    (parameters:SearchReportsParameters, page:number = 1, limit:number = 10)
    :Promise<ModelPaginatorContract<Report>>
    {
        parameters.followsOrder
        console.log('parametros', parameters)
        let query = Report.query()
        if(parameters.type){
            query.where('type', '=', parameters.type);
        }
        if(parameters.followsOrder){
            query.orderBy('follows', parameters.followsOrder);
        }
        return await query.paginate(page, limit)
    }

    public async saveReport(report:Report):Promise<Report>{
       return report.save();
    }
}