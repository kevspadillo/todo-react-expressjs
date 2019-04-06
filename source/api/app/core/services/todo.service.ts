// core/models/book.model.ts

import {Entity, Column, PrimaryColumn, Connection, getConnection, InsertResult, UpdateResult, DeleteResult} from "typeorm";
import {DB} from "../database/app.db";
import {Todo} from "../models/todo.model";

export class TodoService {

    private DB : DB = new DB();

    constructor() {
        
    }
    
    public async getTodos() : Promise<Todo[]> {
        return this.DB.connect().then((connection) => {
            return connection.manager.find(Todo);
        })
    }

    public createTodo(todoData: any) : Promise<InsertResult> {

        const todo = {
            todo_id : todoData.key,
            text : todoData.text 
        };

        return this.DB.connect().then((connection) => {
            return connection
                .createQueryBuilder()
                .insert()
                .into(Todo)
                .values(todo)
                .execute();
        })
    }

    public deleteTodo(todoId) : Promise<DeleteResult> {
        console.log(todoId);
        return this.DB.connect().then((connection) => {
            return connection.createQueryBuilder()
                .delete()
                .from(Todo)
                .where("todo_id = :todo_id", {todo_id : todoId})
                .execute();
        })
    }
}