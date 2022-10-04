import Report from "../Report"

export default class ReportDto{

    public id: number
    public type: number
    public attended: boolean
    public address: string
    public reference: string
    public latitude: number
    public longitude: number
    public description: string
    public email: string
    public images: string[] = []

    public constructor(report:Report){
        this.id = report.id
        this.type = report.type
        this.address = report.address
        this.reference = report.reference
        this.latitude = parseFloat(report.latitude.toString()) 
        this.longitude = parseFloat(report.longitude.toString())
        this.description = report.description
        this.email = report.email
        this.images = JSON.parse(report.images)
    }
}