import { BaseModel, column, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Permission from "../Permissions/Permission";
import Resource from "../Resources/Resource";

export default class Rol extends BaseModel{
    public static table = "roles";
    public static ROLES = {
        USER: 3,
        ADMIN: 2,
        SUPER: 1
    }

    @column({isPrimary: true})
    public id:number

    @column()
    public rol:string

    @column.dateTime({ autoCreate: true, columnName: 'created_at', serializeAs: null})
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, columnName: 'updated_at', serializeAs: null })
    public updatedAt: DateTime
}