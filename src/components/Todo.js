import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './ListTodo';
/* import {publicIpv4,} from 'public-ip'; */
var ip = require('ip');
axios.defaults.baseURL=process.env.BASEURL||"http://52.87.164.240:5000"

let myIp =ip.address()

class Todo extends Component {
  state = {
    todos: [],
  };

  
  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {

    axios
      .get('/api/todos')
      .then((res) => {
        if (res.data) {
          this.setState({
            todos: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { todos } = this.state;

    return (
      <div>
        <h1>My Todo(s) ip {myIp} </h1>
        <Input getTodos={this.getTodos} />
        <ListTodo todos={todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default Todo;
