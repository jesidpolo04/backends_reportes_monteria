import ReportType from "../ReportType";

export default class ReportTypesRepository{

    public async getAllReportTypes():Promise<ReportType[]>{
        return await ReportType.all();
    }

}