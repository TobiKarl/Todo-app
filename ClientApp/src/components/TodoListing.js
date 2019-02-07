import React, { Component } from "react";
import { TodoInput } from "./TodoInput";
import { TodoItemList } from "./TodoItemList";

export class TodoListing extends Component {
  state = {};

  render() {
    const props = this.props;
    let content = props.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <TodoItemList entries={props.todoItems} deleteItem={props.deleteItem} />
    );

    return (
      <div className="todoContainer">
        <TodoInput
          addItem={props.addItem}
          handleItemInput={props.handleItemInput}
          currentItemInput={props.currentItemInput}
        />
        {content}
      </div>
    );
  }
}
