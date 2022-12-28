import ReportsRepository from "../Repositories/ReportsRepository";

export default class UnfollowAReport{

    private reportsRepository:ReportsRepository

    public constructor(reportsRepository:ReportsRepository){
        this.reportsRepository = reportsRepository;
    }

    public async Invoke(reportId:number):Promise<number>{
        return this.reportsRepository.updateReportFollows(reportId, 'unfollow')
    }
}