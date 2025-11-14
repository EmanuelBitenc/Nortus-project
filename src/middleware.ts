import { auth } from "./auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname === "/loginPage";
  const isOnRootPage = req.nextUrl.pathname === "/";
  const isOnDashboard = req.nextUrl.pathname === "/dashboard";

  // Se logado, redireciona para dashboard
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Se não logado e não estiver na página de login, redireciona para login
  if (!isLoggedIn && !isOnLoginPage && !isOnRootPage) {
    return NextResponse.redirect(new URL("/loginPage", req.url));
  }

  // Se não logado e tentar acessar dashboard, redireciona para login
  if (!isLoggedIn && (isOnRootPage || isOnDashboard)) {
    return NextResponse.redirect(new URL("/loginPage", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|imgs|icons).*)",
  ],
};
