import { createFileRoute } from '@tanstack/react-router'
import { Register } from '@/Pages/auth/register'

export const Route = createFileRoute('/auth/register')({
  component: Register,
})

function RouteComponent() {
  return <div>Hello "/auth/register"!</div>
}
