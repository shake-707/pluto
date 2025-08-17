import { createFileRoute } from '@tanstack/react-router'
import { BookPage } from '@/Pages/books/$title'
export const Route = createFileRoute('/books/$title')({
  component: BookPage,
})


