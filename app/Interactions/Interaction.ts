import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export class Interaction extends BaseModel{
    @column({columnName: 'id'})
    public id:number
    @column({columnName: 'report'})
    public reportId:number
    @column({columnName: 'user_document'})
    public userDocument:string
    @column({columnName: 'interaction_type'})
    public interactionTypeId:number
    @column.dateTime({columnName: 'created_at', autoCreate: true})
    public createAt:DateTime
}