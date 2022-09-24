import Report from "../Report"

export default class ReportDto{

    public id: number
    public type: number
    public address: string
    public reference: string
    public latitude: number
    public longitude: number
    public description: string
    public email: string
    public images: string[] = [
        'https://blog.redbus.co/wp-content/uploads/2021/05/monteria.jpg',
        'https://elturismoencolombia.com/wp-content/uploads/2018/06/monteria_travel_cordoba_colombia_travel.jpg'
    ]

    public getDtoFromEntity(report:Report){
        this.id = report.id
        this.type = report.type
        this.address = report.address
        this.reference = report.reference
        this.latitude = parseFloat(report.latitude.toString()) 
        this.longitude = parseFloat(report.longitude.toString())
        this.description = report.description
        this.email = report.email
    }
}