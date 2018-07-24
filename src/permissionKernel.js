import roles from "./permissions";
import { AbilityBuilder, Ability } from "@casl/ability";
import { pick, each, get, set, indexOf } from "lodash";
import { createCanBoundTo } from "@casl/react";

export default class Permissions {
  constructor(_roles) {
    this.roles = _roles;
  }

  getPermission = () => {
    // console.log('Getting permissions for', this.roles)
    const _perm = new Kernel(this.roles);
    _perm.lockPermissions();
    this.permissions = _perm.userPermissions();
    return {
      auth: this.permissions,
      Can: createCanBoundTo(this.permissions.ability)
    };
  };
}

class Kernel extends Permissions {
  constructor(roles) {
    super();
    this.roles = roles;
    // console.log('roles class this', this)
  }
  getRoles = () => {
    return this.roles;
  };

  roleCan = roles;

  lockPermissions = () => {
    for (let role in this.roleCan) {
      // console.log(roleCan[role])
      Object.defineProperty(this.roleCan, role, {
        writable: false
      });

      for (let permission in this.roleCan[role]) {
        Object.defineProperty(this.roleCan[role], permission, {
          writable: false
        });
      }
    }
    return this;
  };

  userPermissions() {
    const { rules, can, cannot } = AbilityBuilder.extract();
    let userPermissions = {};
    let allPermissions;
    const roles = this.getRoles();
    // console.log(
    //   "get(roles, 'SYSTEM_ADMIN')",
    //   get(roles, "SYSTEM_ADMIN"),
    //   roles
    // );
    if (indexOf(roles, "SYSTEM_ADMIN") >= 0) {
      // console.log("------------- system admin is here ------------------");
      allPermissions = this.roleCan;
    } else {
      allPermissions = pick(this.roleCan, this.getRoles());
    }

    each(allPermissions, roles => {
      each(roles, (permissions, module) => {
        // console.log("++++", module, permissions);
        each(permissions, (permission, action) => {
          // console.log(" -->", get(userPermissions, `[${module}][${action}]`));
          if (!get(userPermissions, `[${module}][${action}]`)) {
            set(userPermissions, `[${module}][${action}]`, permission);
            // console.log(
            //   "Setting action",
            //   action,
            //   "permission : ",
            //   permission,
            //   " to module",
            //   module
            // );
            if (get(userPermissions, `[${module}][${action}]`)) {
              can(action, module);
            } else {
              cannot(action, module);
            }
          }
        });
      });
    });

    return {
      ability: new Ability(rules),
      userPermissions
    };
  }
}
