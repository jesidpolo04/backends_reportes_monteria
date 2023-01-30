import ReportType from "../ReportType";
import ReportTypesRepository from "../Repositories/ReportTypesRepository";

export default class CreateReportType{

    private repository:ReportTypesRepository

    public constructor(repository:ReportTypesRepository){
        this.repository = repository;
    }

    public async Invoke(type:string):Promise<ReportType>{
        return this.repository.save(ReportType.instance(type));
    }
}