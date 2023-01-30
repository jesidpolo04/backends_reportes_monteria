import ReportType from "../ReportType";
import ReportTypesRepository from "../Repositories/ReportTypesRepository";

export default class ChangeReportTypeState{

    private repository:ReportTypesRepository

    public constructor(repository:ReportTypesRepository){
        this.repository = repository;
    }

    public async Invoke(id: number):Promise<ReportType>{
        const type = await this.repository.getById(id);
        type.active = !type.active
        return await type.save()
    }
}