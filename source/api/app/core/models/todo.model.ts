// core/models/book.model.ts

import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity({name: "todos"})
export class Todo {

    @PrimaryColumn()
    todo_id: number;

    @Column()
    text: string;
}