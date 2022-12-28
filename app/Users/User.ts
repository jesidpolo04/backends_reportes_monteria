import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Rol from 'App/Auth/Authorization/Roles/Rol'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {

    public static table = 'users'

    @column()
    public name:string

    @column()
    public email:string

    @column({columnName: 'last_name'})
    public lastName:string

    @column({isPrimary:true})
    public document:string

    @column({columnName: 'document_type'})
    public documentType:string

    @column()
    public phone:string

    @column()
    public password:string

    @column({columnName: 'rol'})
    public rolId:number

    @hasOne(()=> Rol)
    public rol:HasOne<typeof Rol>

    @column.dateTime({ autoCreate: true, columnName: 'created_at' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, columnName: 'updated_at' })
    public updatedAt: DateTime

    @beforeSave()
    public static async hashPassword (user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }
}