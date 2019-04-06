// core/controllers/book.controller.ts

import {Request} from "express";
import {TodoService} from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { InsertResult, DeleteResult, UpdateResult } from 'typeorm';

export class TodoController {

    private TodoService : TodoService = new TodoService();

    constructor() {}

    getTodos(): Promise<Todo[]> {
        return this.TodoService.getTodos();
    }
    
    createTodo(todoData : any): Promise<InsertResult> {
        return this.TodoService.createTodo(todoData);
    }
    
    deleteTodo(todoId: number): Promise<DeleteResult> {
        return this.TodoService.deleteTodo(todoId);
    }
}