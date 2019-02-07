import React, { Component } from "react";

export class TodoCategoryList extends Component {
  state = {};

  render() {
    const categories = this.props.categories.map(this.createCategory);
    return <ul>{categories}</ul>;
  }

  createCategory = item => {
    let id;
    let deleteButton;
    const props = this.props;

    item.id === props.currentCategory
      ? (id = "selected")
      : (id = "notSelected");

    item.id === 1
      ? (deleteButton = "")
      : (deleteButton = (
          <button id="delete" onClick={() => props.deleteCategory(item.id)}>
            X
          </button>
        ));

    return (
      <li id={id} key={item.id} onClick={() => props.selectCategory(item.id)}>
        {item.text}
        {deleteButton}
      </li>
    );
  };
}
