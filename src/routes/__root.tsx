import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Providers } from '@/providers/Providers'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}
