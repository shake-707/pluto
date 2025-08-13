import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  users: UsersTable;
  books: BooksTable;
  user_reviews: UserReviews;
  user_follows: UserFollowers;
  book_authors: BookAuthors;
  books_authors_join: BooksAuthorsJoin;
}

export interface UsersTable {
  id: Generated<number>;
  user_name: string;
  email: string;
  password_hash: string;
  created_at: ColumnType<Date, undefined, never>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UpdateUser = Updateable<UsersTable>;

export interface BooksTable {
  key: string;
  title: string;
  cover_id?: number;
  year_released?: number;
  description?: string;
}

export type Book = Selectable<BooksTable>;
export type NewBook = Insertable<BooksTable>;

export interface UserFollowers {
  user_id: number;
  followed_user_id: number;
}

export type Followers = Selectable<UserFollowers>;
export type NewFollow = Insertable<UserFollowers>;

export interface UserReviews {
  user_id: number;
  book_key: string;
  text_body: string;
  rating: number;
  created_at: ColumnType<Date, undefined, never>;
  updated_at: ColumnType<Date>;
}

export type Review = Selectable<UserReviews>;
export type NewReview = Insertable<UserReviews>;
export type UpdateReview = Updateable<UserReviews>;

export interface BookAuthors {
  key: string;
  name: string;
}

export type BookAuthor = Selectable<BookAuthors>;
export type NewBookAuthor = Insertable<BookAuthors>;

export interface BooksAuthorsJoin {
  author_key: string;
  book_key: string;
}

export type BookAuthorJoin = Selectable<BooksAuthorsJoin>;
