import React, { Component } from "react";

export class TodoCategoryInput extends Component {
  state = {};

  render() {
    const props = this.props;
    return (
      <div className="header">
        <form onSubmit={props.addCategory}>
          <input
            placeholder="Category"
            onChange={props.handleCategoryInput}
            value={props.currentCategoryInput.text}
          />

          <button type="submit"> Add Category</button>
        </form>
      </div>
    );
  }
}
