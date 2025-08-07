import { createRouter, RouteConfig } from "./index";
import { BooksController } from "@controllers/index";

//  {
//     method: 'post',
//     path: '/login',
//     // check if request body has valid login inputs
//     middleware: [ValidationsMiddleware.validateBody(AuthController.AuthSchema.login)],
//     handler: AuthController.loginUser,
//   },

const routes: RouteConfig[] = [
    {
        method: 'get',
        path: '/get-books',
        handler: BooksController.fetchBooks
    }
]

export const BookRouter = createRouter(routes);