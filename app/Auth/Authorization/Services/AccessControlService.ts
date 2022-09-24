import {AccessControl} from 'accesscontrol'
import Grant from '../Grant'
import GrantsRepository from '../Repositories/GrantsRepository'

export default class AccessControlService{

    private grantsRepository:GrantsRepository
    constructor(){
        this.grantsRepository = new GrantsRepository()
    }

    public async configAccesControl():Promise<AccessControl>{
        let grants:Grant[] = await this.grantsRepository.getAllGrants()
        let accessControl = new AccessControl()
        for (let grant of grants) {
            let access = accessControl.grant(grant.rol) 
            switch (grant.permission){
                case 'read':
                    access.read(grant.resource)
                break;
                case 'create':
                    access.create(grant.resource)
                break;
                case 'delete':
                    access.delete(grant.resource)
                break;
                case 'update':
                    access.update(grant.resource)
                break;
            }
        }
        return accessControl
    }
}