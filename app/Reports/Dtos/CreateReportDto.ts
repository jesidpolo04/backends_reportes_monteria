import Report from "../Report"
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export default class CreateReportDto{
    public type: number
    public address: string
    public reference: string
    public latitude: number
    public longitude: number
    public description: string
    public email: string
    public user_document: string
    public images: MultipartFileContract[]

    public constructor(request:any){
        this.type = request.type
        this.address = request.address
        this.reference = request.reference
        this.latitude = request.latitude
        this.longitude = request.longitude
        this.description = request.description
        this.email = request.email 
        this.user_document = request.user_document
    }

    public getReportFromDto():Report{
        const report:Report = new Report();
        report.type = this.type;
        report.address = this.address;
        report.reference = this.reference;
        report.latitude = this.latitude;
        report.longitude = this.longitude;
        report.description = this.description;
        report.email = this.email;
        report.userDocument = this.user_document;

        return report;
    }
}