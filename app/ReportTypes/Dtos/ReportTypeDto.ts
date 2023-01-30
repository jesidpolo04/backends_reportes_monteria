import ReportType from "../ReportType"

export default class ReportTypeDto{
    public id:number
    public type:string
    public active:boolean

    public setDtoFromEntity(reportType:ReportType){
        this.id = reportType.id;
        this.type = reportType.type;
        this.active = reportType.active;
    }
}