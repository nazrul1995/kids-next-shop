import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const privateRoute = ['/dashboard', '/cart', '/checkout']

export async function proxy(req) {
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivateRoute = privateRoute.some((route)=>req.nextUrl.pathname.startsWith(route))
  if(!isAuthenticated && isPrivateRoute){
   
    return NextResponse.redirect(new URL(`/login?callbackUrl=${reqPath}`, req.url))
  }  
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/dashboard/:path*', '/cart/:path*', '/checkout/:path*'],
}