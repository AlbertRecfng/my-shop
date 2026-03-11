export { auth as middleware } from '@/auth'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/checkout/:path*',
    '/orders/:path*',
  ],
}