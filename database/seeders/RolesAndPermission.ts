import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Auth/Authorization/Permissions/Permission'
import Resource from 'App/Auth/Authorization/Resources/Resource'
import Rol from 'App/Auth/Authorization/Roles/Rol'
import { USER_PERMISSIONS } from './RolesAndPermissions/UserPermissions'
import { SUPER_PERMISSIONS } from './RolesAndPermissions/SuperPermissions'

export default class extends BaseSeeder {
  public async run () {
    await this.makeRoles()
    await this.makeResources()
    await this.makePermissions()
    await this.rolesHasPermissions()
  }

  private async makeRoles(){
    await Rol.createMany([
      {
        id: 1,
        rol: 'super'
      },
      {
        id: 2,
        rol: 'admin'
      },
      {
        id: 3,
        rol: 'user'
      }
    ])
  }

  private async makePermissions(){
    await Permission.createMany([
      {
        id: 1,
        permission: 'read'
      },
      {
        id: 2,
        permission: 'create'
      },
      {
        id: 3,
        permission: 'update'
      },
      {
        id: 4,
        permission: 'delete'
      }
    ])
  }

  private async makeResources(){
    await Resource.createMany([
      {
        id: 1,
        resource: 'users'
      },
      {
        id: 2,
        resource: 'reports'
      },
      {
        id: 3,
        resource: 'interactions'
      },
      {
        id: 4,
        resource: 'roles'
      },
      {
        id: 5,
        resource: 'permissions'
      },
      {
        id: 6,
        resource: 'resources'
      },
      {
        id: 7,
        resource: 'report_types'
      }
    ])
  }

  private async rolesHasPermissions(){
    await Database.table('roles_resources_permissions').multiInsert([
      ...USER_PERMISSIONS,
      ...SUPER_PERMISSIONS
    ])

  }
}
