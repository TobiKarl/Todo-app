import React, { Component } from "react";
export class TodoItemList extends Component {
  state = {};

  createTasks = item => {
    return (
      <li
        key={item.id}
        onClick={() => this.props.deleteItem(item.id, item.category)}
      >
        {item.text}
      </li>
    );
  };

  render() {
    const listItems = this.props.entries.map(this.createTasks);
    return <ul>{listItems}</ul>;
  }
}
