import CreateReportDto from "../Dtos/CreateReportDto";
import Report from "../Report";

export default class ReportsRepository{

    public async getAllReports():Promise<Report[]>{
        let allReports:Report[] = await Report.all();
        return allReports;
    }

    public async saveReport(report:Report):Promise<Report>{
       return report.save();
    }
}