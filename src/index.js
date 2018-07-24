import React from "react";
import { render } from "react-dom";
import Permissions from "./permissionKernel";

// const _perm = new Permissions(["SYSTEM_ADMIN"]);
// const _perm = new Permissions(['SCRIBE_DEVELOPER'])
const _perm = new Permissions(["SCRIBE_MANAGER", "PLAN_MANAGER"]);

console.log("_perm", _perm);
const { auth, Can } = _perm.getPermission();

console.log("can list scribe : ", auth.ability.can("list", "scribe"));
console.log("can delete scribe : ", auth.ability.can("delete", "scribe"));
console.log("can create scribe : ", auth.ability.can("create", "scribe"));
console.log("can edit scribe : ", auth.ability.can("edit", "scribe"));
// can.SYSTEM_ADMIN = false
// export default Permissions;

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

render(<App />, document.getElementById("root"));
