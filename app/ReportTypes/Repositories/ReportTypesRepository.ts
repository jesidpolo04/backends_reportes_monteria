import ReportType from "../ReportType";

export default class ReportTypesRepository{

    public async getAll():Promise<ReportType[]>{
        return await ReportType.all();
    }

    public async save(reportType:ReportType):Promise<ReportType>{
        return await reportType.save()
    }

    public async getById(id: number){
        return ReportType.findOrFail(id)
    }

}