import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import NoLocationProvidedException from "App/Exceptions/NoLocationProvidedException";
import UseCase from "App/Shared/UseCase";
import Report from "../Report";
import ReportsRepository from "../Repositories/ReportsRepository";
import { SearchReportsParameters } from "../SearchReportsParameters";
import { getDistance } from 'geolib';


export class SearchReports extends UseCase{
    private reportsRepository:ReportsRepository

    public constructor(reportsRepository:ReportsRepository){
        super()
        this.reportsRepository = reportsRepository;
    }

    public async Invoke(searchParameters:SearchReportsParameters):Promise<ModelPaginatorContract<Report>>{
        this.verifyParameters(searchParameters)
        const reports = await this.reportsRepository.getReportsByParameters(searchParameters)
        if(searchParameters.proximity){
            this.filterReportsByProximity(
                searchParameters.proximity, 
                searchParameters.lat!, 
                searchParameters.lon!,
                reports.all()
            )
        }
        return await this.reportsRepository.getReportsByParameters(searchParameters)
    }

    private filterReportsByProximity(proximityInMeters:number, lat:number, lon:number, reports:Report[]):Report[]{
        const closeReports:Report[] = []
        const userCoords = {
            latitude: lat,
            longitude: lon
        }
        reports.forEach(report => {
            const reportCoords = {
                latitude: report.latitude,
                longitude: report.longitude
            }
            let distance:number = getDistance(userCoords, reportCoords);
            console.log('distance', distance)
            if(distance <= proximityInMeters){
                console.log('Reporte cerca: ', distance, 'metros')
                closeReports.push(report)
            }
        })
        return closeReports
    }

    private verifyParameters(parameters:SearchReportsParameters):void{
        if(parameters.proximity){
            if(!parameters.lat || !parameters.lon){
                throw new NoLocationProvidedException()
            }
        }
    }
}