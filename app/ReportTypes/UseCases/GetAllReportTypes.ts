import ReportType from "../ReportType";
import ReportTypesRepository from "../Repositories/ReportTypesRepository";

export default class GetAllReportTypes{

    private repository:ReportTypesRepository

    public constructor(repository:ReportTypesRepository){
        this.repository = repository;
    }

    public async Invoke():Promise<ReportType[]>{
        return this.repository.getAllReportTypes();
    }
}