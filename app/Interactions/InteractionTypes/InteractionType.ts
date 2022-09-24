import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class InteractionType extends BaseModel {

    public static table = 'interaction_types'

    @column({isPrimary: true})
    public id: number

    @column()
    public interaction: string

    @column.dateTime({ autoCreate: true, columnName: 'created_at', serializeAs: null})
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, columnName: 'updated_at', serializeAs: null })
    public updatedAt: DateTime
}