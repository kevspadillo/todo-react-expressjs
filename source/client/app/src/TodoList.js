import React, {Component} from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {

    constructor(properties) {
        super(properties);

        this.state = {
            items : []
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8091/todo")
            .then(response => response.json())
            .then((result) => {
                this.setState({items : result.data});
            })
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input 
                            ref={(a) => this._inputElement = a}
                            placeholder="Enter Task">
                        </input>
                        <button type="submit">Add</button>
                    </form>
                </div>
                <TodoItems 
                    entries={this.state.items}
                    delete={this.deleteItem}>
                </TodoItems>
            </div>
        );
    }

    addItem(event) {

        if (this._inputElement.value !== "") {
            var newItem = {
                text : this._inputElement.value,
                key : Date.now()
            }
            
            fetch("http://localhost:8091/todo", {
                method: "POST",
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(newItem)
            });

            this.setState((previousState) => {
                return {
                    items : previousState.items.concat(newItem)
                }
            });

            this._inputElement.value = "";
        }
        event.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.todo_id !== key);
          });

        this.setState({
            items : filteredItems
        });
    }
}

export default TodoList;