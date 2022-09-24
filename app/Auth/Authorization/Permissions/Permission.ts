import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Permission extends BaseModel{
    public static table = "permissions";

    @column({isPrimary: true})
    public id:number

    @column()
    public permission:string

    @column.dateTime({ autoCreate: true, columnName: 'created_at', serializeAs: null})
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, columnName: 'updated_at', serializeAs: null })
    public updatedAt: DateTime
}