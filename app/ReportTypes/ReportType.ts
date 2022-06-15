import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ReportType extends BaseModel {

    public static table = 'report_types'

    @column({isPrimary: true})
    public id: number

    @column()
    public type: string

    @column.dateTime({ autoCreate: true, columnName: 'created_at' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, columnName: 'updated_at' })
    public updatedAt: DateTime
}