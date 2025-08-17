import { createFileRoute } from '@tanstack/react-router'
import AccountPage from '@/Pages/account'
export const Route = createFileRoute('/account/$username')({
  component: AccountPage,
})
