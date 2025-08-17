import { createFileRoute } from '@tanstack/react-router'
import BookPage from '@/Pages/books'

export const Route = createFileRoute('/books/')({
  component: BookPage,
})

function RouteComponent() {
  return <div>Hello "/books/"!</div>
}
