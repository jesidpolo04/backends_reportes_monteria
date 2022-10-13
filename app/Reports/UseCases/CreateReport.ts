import CreateReportDto from "../Dtos/CreateReportDto";
import Report from "../Report";
import ReportsRepository from "../Repositories/ReportsRepository";
import Env from "@ioc:Adonis/Core/Env"
import { v4 as uuidv4 } from 'uuid';

export default class CreateReport{
    private reportsRepository:ReportsRepository
    private showImageEndpoint: string
    private hostUrl: string

    public constructor(reportsRepository:ReportsRepository){
        this.reportsRepository = reportsRepository;
        this.showImageEndpoint = '/reports/image/'
        this.hostUrl = Env.get('URL')
    }
    
    public async Invoke(request:CreateReportDto):Promise<Report>{
        let report = request.getReportFromDto()
        let imagesUrls:string[] = [] 
        for (let image of request.images) {
            let name = `${uuidv4()}.${image.extname}`
            await image.move('./images', {name})
            imagesUrls.push(`${this.hostUrl}${this.showImageEndpoint}${name}`)
        }
        report.images = JSON.stringify(imagesUrls) 
        return await this.reportsRepository.saveReport(report);
    }
}