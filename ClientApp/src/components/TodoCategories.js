import React, { Component } from "react";
import { TodoCategoryInput } from "./TodoCategoryInput";
import { TodoCategoryList } from "./TodoCategoryList";

export class TodoCategories extends Component {
  state = {};

  render() {
    const props = this.props;

    let content = props.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <TodoCategoryList
        categories={props.categories}
        deleteCategory={props.deleteCategory}
        selectCategory={props.selectCategory}
        currentCategory={props.currentCategory}
      />
    );

    return (
      <div id="categories" className="todoContainer">
        <TodoCategoryInput
          addCategory={props.addCategory}
          handleCategoryInput={props.handleCategoryInput}
          currentCategoryInput={props.currentCategoryInput}
        />
        {content}
      </div>
    );
  }
}
