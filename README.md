This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Lib: 
1: https://github.com/stalniy/casl/tree/master/packages/casl-react <br>
2: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html <br>

### Files
1: permissions.js ---> role based permissions json  <br>
2: permissionKernel ---> Permission logic based on permission <br>
defined in permission json file with the help of @casl/abilities <br>

### How to 
```
import Permissions from "./permissionKernel";

const _perm = new Permissions(["SYSTEM_ADMIN"]);
// const _perm = new Permissions(['SCRIBE_DEVELOPER', 'PLAN_MANAGER'])
// const _perm = new Permissions(["SCRIBE_MANAGER"]);

const { auth, Can } = _perm.getPermission();

console.log("can list scribe : ", auth.ability.can("list", "scribe"));
console.log("can delete scribe : ", auth.ability.can("delete", "scribe"));
console.log("can create scribe : ", auth.ability.can("create", "scribe"));
console.log("can edit scribe : ", auth.ability.can("edit", "scribe"));

const App = () => (
  <div>
    <h2>----------------------------------</h2>
    <Can I="list" a="scribe">
      <div>List Scribe</div>
    </Can>
    <Can I="delete" a="scribe">
      <div>Delete Scribe</div>
    </Can>
    <Can I="create" a="scribe">
      <div>Create Scribe</div>
    </Can>
    <Can I="edit" a="scribe">
      <div>Edit Scribe</div>
    </Can>
    <Can I="create" a="plan">
      <div>Create Plan</div>
    </Can>
    <h2>----------------------------------</h2>
  </div>
);
```
