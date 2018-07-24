import React, { Component, Fragment } from "react";
import UncontrolledEmailInput from "./UncontrolledEmailInput";

export default class AccountsList extends Component {
  state = {
    selectedIndex: 0
  };

  render() {
    const { accounts } = this.props;
    const { selectedIndex } = this.state;
    const selectedAccount = accounts[selectedIndex];
    return (
      <Fragment>
        <h1>
          This demo illustrates resetting an uncontrolled component with a
          special prop
        </h1>
        <blockquote>First, make an edit to the account "One" email.</blockquote>
        <UncontrolledEmailInput
          defaultEmail={selectedAccount.email}
          userID={selectedAccount.id}
        />
        <blockquote>Next, select account "Two" below.</blockquote>
        <p>
          Accounts:
          {this.props.accounts.map((account, index) => (
            <label key={account.id}>
              <input
                type="radio"
                name="account"
                checked={selectedIndex === index}
                onChange={() => this.setState({ selectedIndex: index })}
              />{" "}
              {account.name}
            </label>
          ))}
        </p>
        <p>
          Even though both accounts have the same "committed" email, toggling
          between the two properly resets the "draft" email state. Read the
          inline comments in <code>UncontrolledEmailInput.js</code> to learn
          why.
        </p>
      </Fragment>
    );
  }
}
