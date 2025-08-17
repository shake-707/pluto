import { createFileRoute } from '@tanstack/react-router'
import Account from '@/Pages/account';
export const Route = createFileRoute('/account/$username')({
  component: Account,
})
