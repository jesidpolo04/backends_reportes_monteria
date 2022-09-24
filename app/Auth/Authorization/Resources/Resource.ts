import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Resource extends BaseModel{
    public static table = "resources";

    @column({isPrimary: true})
    public id:number

    @column()
    public resource:string

    @column.dateTime({ autoCreate: true, columnName: 'created_at', serializeAs: null})
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, columnName: 'updated_at', serializeAs: null })
    public updatedAt: DateTime
}