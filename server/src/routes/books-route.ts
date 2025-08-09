import { createRouter, RouteConfig } from "./index";
import { BooksController } from "@controllers/index";


const routes: RouteConfig[] = [
    {
        method: 'get',
        path: '/get-books',
        handler: BooksController.fetchBooks
    }
]

export const BookRouter = createRouter(routes);