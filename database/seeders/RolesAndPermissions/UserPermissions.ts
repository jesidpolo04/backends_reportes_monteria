import { PERMISSIONS_IDS } from "App/Auth/Authorization/Permissions/PermissionsDictionary";
import { RESOURCES_IDS } from "App/Auth/Authorization/Resources/ResourcesDictionary";
import { ROLES_IDS } from "App/Auth/Authorization/Roles/RolesDictionary";

export const USER_PERMISSIONS = [

    //REPORT TYPES
    {
        'rol_id': ROLES_IDS.USER,
        'resource_id': RESOURCES_IDS.REPORTS_TYPES,
        'permission_id': PERMISSIONS_IDS.READ
    },
    //REPORS
    {
        'rol_id': ROLES_IDS.USER,
        'resource_id': RESOURCES_IDS.REPORTS,
        'permission_id': PERMISSIONS_IDS.READ
    },
    {
        'rol_id': ROLES_IDS.USER,
        'resource_id': RESOURCES_IDS.REPORTS,
        'permission_id': PERMISSIONS_IDS.CREATE
    },
    //INTERACTIONS
    {
        'rol_id': ROLES_IDS.USER,
        'resource_id': RESOURCES_IDS.INTERACTIONS,
        'permission_id': PERMISSIONS_IDS.CREATE
    },
    {
        'rol_id': ROLES_IDS.USER,
        'resource_id': RESOURCES_IDS.INTERACTIONS,
        'permission_id': PERMISSIONS_IDS.DELETE
    },
  ]