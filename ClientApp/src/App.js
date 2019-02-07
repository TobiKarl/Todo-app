import React, { Component } from "react";
import "./index.css";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Todo } from "./components/Todo";

export default class App extends Component {
  //static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Todo} />
      </Layout>
    );
  }
}
