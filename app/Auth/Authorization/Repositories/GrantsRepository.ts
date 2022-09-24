import Database, { RawQueryBuilderContract } from "@ioc:Adonis/Lucid/Database";
import Grant from "../Grant";

export default class GrantsRepository{
    
    public async getAllGrants():Promise<Grant[]>{
        const sql = `SELECT ro.rol, re.resource, pe.permission FROM roles ro
        JOIN roles_resources_permissions rrp ON ro.id = rrp.rol_id
        JOIN resources re ON re.id = rrp.resource_id
        JOIN permissions pe ON pe.id = rrp.permission_id`;
        const grantsQueryBuilder:any = await Database.rawQuery(sql)
        const grants:Grant[] = grantsQueryBuilder.rows
        return grants;
    }
}