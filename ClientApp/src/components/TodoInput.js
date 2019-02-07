import React, { Component } from "react";

export class TodoInput extends Component {
  state = {};

  render() {
    const props = this.props;
    return (
      <div className="header">
        <form onSubmit={props.addItem}>
          <input
            placeholder="Task"
            value={props.currentItemInput.text}
            onChange={props.handleItemInput}
          />
          <button type="submit"> Add Task </button>
        </form>
      </div>
    );
  }
}
