// core/routes/app.routes.ts

import {Request, Response} from "express";
import {TodoController} from "../controllers/todo.controller";

export class Routes {

    private TodoController : TodoController = new TodoController();

    /**
     * routes
     */
    public routes(app): void {

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

        app.route('/')
            .get(
                (req: Request, res: Response) => {
                    res.status(200).send({
                        message: 'Get request success'
                    });
            });

        app.route('/todo')
            .get(
                (req: Request, res: Response) => {
                    this.TodoController.getTodos()
                        .then((todos => {
                            res.status(200).json({data : todos});
                        }));
                }
            )
            .post(
                (req: Request, res: Response) => {
                    this.TodoController.createTodo(req.body)
                        .then((result) => {
                            res.status(200).json(result)
                        });
                }
            );

        app.route('/todo/:todoId')
            .delete(
                (req: Request, res: Response) => {
                    this.TodoController.deleteTodo(req.params.todoId)
                        .then((result) => {
                            res.status(200).json(result.affected)
                        });
                }
            );
    }
}