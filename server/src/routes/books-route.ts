import { createRouter, RouteConfig } from "./index";
import { BooksController } from "@controllers/index";


const routes: RouteConfig[] = [
    {
        method: 'get',
        path: '/',
        handler: BooksController.getBooksController
    }
]

export const BookRouter = createRouter(routes);