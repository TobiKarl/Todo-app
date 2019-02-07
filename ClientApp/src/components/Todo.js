import React, { Component } from "react";
import { TodoCategories } from "./TodoCategories";
import { TodoListing } from "./TodoListing";

export class Todo extends Component {
  static displayName = Todo.name;
  inputElement = React.createRef();

  constructor() {
    super();
    this.state = {
      loadingItems: true,
      loadingCategories: true,
      maxItemLength: 60,
      maxCategoryLength: 20,
      todoItems: [],
      todoCategories: [],
      currentItemInput: {
        text: "",
        key: 0
      },
      currentCategoryInput: { text: "", key: 0 },
      currentCategory: 1
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const state = this.state;
    return (
      <div>
        <TodoCategories
          categories={state.todoCategories}
          currentCategoryInput={state.currentCategoryInput}
          addCategory={this.addCategory}
          deleteCategory={this.deleteCategory}
          handleCategoryInput={this.handleCategoryInput}
          currentCategory={state.currentCategory}
          selectCategory={this.selectCategory}
          loading={state.loadingCategories}
        />
        <TodoListing
          todoItems={state.todoItems}
          currentItemInput={state.currentItemInput}
          addItem={this.addItem}
          deleteItem={this.deleteItem}
          handleItemInput={this.handleItemInput}
          loading={state.loadingItems}
        />
      </div>
    );
  }

  handleItemInput = e => {
    const maxLength = this.state.maxItemLength;
    if (this.state.currentItemInput.text.length >= maxLength) return;

    const currentItemInput = { text: e.target.value, key: Date.now() };
    this.setState({ currentItemInput });
  };

  handleCategoryInput = e => {
    const maxLength = this.state.maxCategoryLength;
    if (this.state.currentCategoryInput.text.length >= maxLength) return;

    const currentCategoryInput = { text: e.target.value, key: Date.now() };
    this.setState({ currentCategoryInput });
  };

  selectCategory = key => {
    if (key <= 0) return;

    const currentCategory = key;
    this.setState({ currentCategory, loadingItems: true }, () => {
      this.getTodoItems();
    });
  };

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItemInput;
    if (newItem.text === "") return;

    const URL = "api/TodoData/AddItem";
    var body = JSON.stringify({
      key: newItem.key,
      Text: newItem.text,
      Category: this.state.currentCategory
    });

    this.post(URL, body).then(data => {
      this.setState({
        todoItems: data,
        currentItemInput: { text: "", key: "" }
      });
    });
  };

  addCategory = e => {
    e.preventDefault();
    const newCategory = this.state.currentCategoryInput;
    if (newCategory.text === "") return;

    const URL = "api/TodoData/AddCategory";
    var body = JSON.stringify({
      Text: newCategory.text
    });

    this.post(URL, body).then(data => {
      this.setState({
        todoCategories: data,
        currentCategoryInput: { text: "", key: "" }
      });
    });
  };

  getCategories() {
    const URL = "api/TodoData/TodoCategories";

    this.get(URL, null)
      .then(data => {
        this.setState({ todoCategories: data, loadingCategories: false });
      })
      .then(this.getTodoItems());
  }

  getTodoItems() {
    const URL = "api/TodoData/TodoCategoryItems/" + this.state.currentCategory;

    this.get(URL, null).then(data => {
      this.setState({ todoItems: data, loadingItems: false });
    });
  }

  deleteItem = (key, category) => {
    const URL = "api/TodoData/DeleteItem";
    var body = JSON.stringify({
      Id: key,
      Category: category
    });
    this.post(URL, body).then(data => {
      this.setState({ todoItems: data });
    });
  };

  deleteCategory = key => {
    if (key <= 1) return;

    const URL = "api/TodoData/DeleteCategory";
    var body = JSON.stringify({
      Id: key
    });

    this.post(URL, body).then(data => {
      this.setState({ currentCategory: 1, todoCategories: data });
      this.getTodoItems();
    });
  };

  get(resource, payload) {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: payload
    };
    return fetch(resource, requestOptions)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  post(resource, payload) {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: payload
    };
    return fetch(resource, requestOptions)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }
}
