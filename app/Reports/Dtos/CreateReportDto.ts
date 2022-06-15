import Report from "../Report"

export default class CreateReportDto{
    public type: number
    public address: string
    public reference: string
    public latitude: number
    public longitude: number
    public description: string
    public email: string

    public setDtoFromRequest(request:any):void{
        this.type = request.type
        this.address = request.address
        this.reference = request.reference
        this.latitude = request.latitude
        this.longitude = request.longitude
        this.description = request.description
        this.email = request.email 
    }

    public getReportFromDto():Report{
        const report:Report = new Report();
        report.type = this.type;
        report.address = this.address;
        report.reference = this.reference;
        report.latitude = this.latitude;
        report.longitude = this.longitude;
        report.email = this.email;

        return report;
    }
}