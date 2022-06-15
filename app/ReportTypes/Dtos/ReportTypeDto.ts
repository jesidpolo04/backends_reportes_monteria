import ReportType from "../ReportType"

export default class ReportTypeDto{
    public id:number
    public type:string

    public setDtoFromEntity(reportType:ReportType){
        this.id = reportType.id;
        this.type = reportType.type;
    }
}