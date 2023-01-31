import Report from "../Report"

export default class ReportDto{

    public id: number
    public type: number
    public type_name: string
    public attended: boolean
    public address: string
    public reference: string
    public latitude: number
    public longitude: number
    public description: string
    public email: string
    public document: string
    public follows: number
    public images: string[] = []
    public date: string

    public constructor(report:Report){
        this.id = report.id
        this.type = report.type
        this.type_name = report.$extras['type_name']
        this.address = report.address
        this.reference = report.reference
        this.latitude = parseFloat(report.latitude.toString()) 
        this.longitude = parseFloat(report.longitude.toString())
        this.description = report.description
        this.email = report.email
        this.document = report.userDocument
        this.follows = report.follows
        this.images = JSON.parse(report.images)
        this.date = report.createdAt.toFormat('dd/MM/yyyy hh:mm')
    }
}