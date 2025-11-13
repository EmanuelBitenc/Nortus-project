import { auth } from "./auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname === "/loginPage";
  const isOnRootPage = req.nextUrl.pathname === "/";

  // Se logado, redireciona apra tela inicial
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Se não logado, redireciona para pagina de login
  if (!isLoggedIn && !isOnLoginPage && isOnRootPage) {
    return NextResponse.redirect(new URL("/loginPage", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|imgs|icons).*)",
  ],
};
