import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profiles/$userName')({
  component: RouteComponent,
})

function RouteComponent() {
    const param = Route.useParams();
  return <div>Hello "/profiles/{param.userName}"!</div>
}
