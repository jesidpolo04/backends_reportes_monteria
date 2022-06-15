import ReportsRepository from "../Repositories/ReportsRepository";
import Report from "../Report";

export default class GetAllReports{

    private reportsRepository:ReportsRepository

    public constructor(reportsRepository:ReportsRepository){
        this.reportsRepository = reportsRepository;
    }

    public async Invoke():Promise<Report[]>{
        let reports:Report[] = await this.reportsRepository.getAllReports();
        return reports
    }
}