import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("user_token");
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  if (!isCookiesExist && isRegisterPage) {
    return NextResponse.next();
  }

  if (!isCookiesExist && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isCookiesExist && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
