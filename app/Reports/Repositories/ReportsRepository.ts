import Database, { SimplePaginatorContract } from "@ioc:Adonis/Lucid/Database";
import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import { Query } from "accesscontrol";
import NotFoundException from "App/Exceptions/NotFoundException";
import ServerErrorException from "App/Exceptions/ServerErrorException";
import Report from "../Report";
import { SearchReportsParameters } from "../SearchReportsParameters";
import { DateTime } from "luxon";

export default class ReportsRepository{

    public async getReportById(id:number):Promise<Report | undefined | null>{
        return Report.query()
        .leftJoin('report_types', 'report_types.id', '=', 'reports.type').select('reports.*', 'report_types.type as type_name')
        .where('reports.id', id).first()
    }

    public async getAllReports(page = 1, limit = 10):Promise<ModelPaginatorContract<Report>>{
        let allReports = await Report.query()
        .leftJoin('report_types', 'report_types.id', '=', 'reports.type').select('reports.*', 'report_types.type as type_name')
        .paginate(page, limit)
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
            query.where('reports.type', '=', parameters.type);
        }
        if(parameters.document){
            query.where('user_document', '=', parameters.document)
        }
        if(parameters.followsOrder){
            query.orderBy('follows', parameters.followsOrder);
        }
        if(parameters.date){
            query.where('reports.created_at', '>=', parameters.date);
        }
        query.leftJoin('report_types', 'report_types.id', '=', 'reports.type').select('reports.*', 'report_types.type as type_name')
        return await query.paginate(page, limit)
    }

    public async saveReport(report:Report):Promise<Report>{
       return report.save();
    }

    public async updateReportFollows(reportId:number, action:Traceable):Promise<number>{
        const report = await Report.find(reportId)
        if(!report){
            throw new NotFoundException()
        }
        if(action === "follow") report.follows ++;
        else report.follows --;
        try{
            report.save()
            return report.follows;
        }catch(e){
            throw new ServerErrorException()
        }
    }
}