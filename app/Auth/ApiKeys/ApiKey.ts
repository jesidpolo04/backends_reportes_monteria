import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import generateApiKey from 'generate-api-key'

export default class ApiKey extends BaseModel{
    
    public static table = 'api_keys'

    @column({isPrimary: true})
    public id: number

    @column()
    public key:string

    @column()
    public application:string

    @column.dateTime({ autoCreate: true, columnName: 'created_at' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, columnName: 'updated_at' })
    public updatedAt: DateTime

    public generateKey():string{
        return generateApiKey({
            method: 'string',
            pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijqlmnopqrztvwxyz123456789'
        })
    }

}