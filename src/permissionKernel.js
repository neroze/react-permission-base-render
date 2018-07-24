import allPermissions from "./permissions";
import { AbilityBuilder, Ability } from "@casl/ability";
import { pick, each, get, set, indexOf } from "lodash";
import { createCanBoundTo } from "@casl/react";
const { rules, can, cannot } = AbilityBuilder.extract();
/**
 * Public class
 */
export default class Permissions {
  constructor(_roles) {
    this.roles = _roles;
  }
  /**
   * Gets permission for the user based on the role passed
   * @return Object auth: casl/ability object with permission defined, Can: Wrapper component to render component based on permission
   */
  getPermission = () => {
    /**
     * new Permission kernel instance
     * @type Kernel
     */
    const _perm = new Kernel(this.roles);
    /**
     * Lock all the permission to read only
     */
    _perm.lockPermissions();
    /**
     * get role based user Permissions
     * @type Object
     */
    this.permissions = _perm.userPermissions();
    return {
      auth: this.permissions,
      Can: createCanBoundTo(this.permissions.ability)
    };
  };
}

/**
 * Private Permission kernel class
 */
class Kernel extends Permissions {
  constructor(_userRoles) {
    super();
    /**
     * set user role
     * @type Array ie: ["SCRIBE_MANAGER", "PLAN_MANAGER"]
     */
    this.roles = _userRoles;
    /**
     * set all permissions from JSON file to object
     * @type JSON
     */
    this.rolePermissions = allPermissions;
  }

  /**
   * Returns current user roles
   * @return {[type]} [description]
   */
  getRoles = () => {
    return this.roles;
  };

  /**
   * Locks all the json based permissions to read only
   * @return context
   */
  lockPermissions = () => {
    for (let role in this.rolePermissions) {
      // consolethis.rolePermissions[role])
      Object.defineProperty(this.rolePermissions, role, {
        writable: false
      });

      for (let permission in this.rolePermissions[role]) {
        Object.defineProperty(this.rolePermissions[role], permission, {
          writable: false
        });
      }
    }
    return this;
  };

  /**
   * returns user role based permissions and ability instance
   * @return Object
   */
  userPermissions() {
    let userPermissions = {};
    let allPermissions;
    const roles = this.getRoles();

    // check if user role has system admin permission, if yes enable all permissions or else set permission based on user roles
    if (indexOf(roles, "SYSTEM_ADMIN") >= 0) {
      allPermissions = this.rolePermissions;
    } else {
      allPermissions = pick(this.rolePermissions, this.getRoles());
    }

    each(allPermissions, roles => {
      each(roles, (permissions, module) => {
        if (module) {
          each(permissions, (permission, action) => {
            if (!get(userPermissions, `[${module}][${action}]`)) {
              // set module based action permission
              set(userPermissions, `[${module}][${action}]`, permission);
              // set ability
              if (get(userPermissions, `[${module}][${action}]`)) {
                can(action, module);
              } else {
                cannot(action, module);
              }
            }
          });
        }
      });
    });

    return {
      ability: new Ability(rules),
      userPermissions
    };
  }

  updatePermission(module, action, perm) {
    if (perm === "can") {
      can(module, action);
    } else {
      cannot(module, action);
    }
  }
}
