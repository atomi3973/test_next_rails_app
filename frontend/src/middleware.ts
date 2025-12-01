// export { auth as middleware } from "@/auth";

// export const config = {
//   matcher: [
//     "/((?!api/auth/callback/google|api/auth/error).*)"
//   ],
// };

// import { auth } from "@/auth"

 
// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin)
//     return Response.redirect(newUrl)
//   }
// })

// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

// export const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     return Response.redirect(new URL("/login", req.url));
//   }
// });

// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   const { nextUrl } = req;

//   // ログインが必要なパス
//   if (nextUrl.pathname.startsWith("/")) {
//     if (!req.auth) {
//       return NextResponse.redirect(new URL("/login", nextUrl.origin));
//     }
//   }

//   return NextResponse.next();
// });

// // 適用対象
// export const config = {
//   matcher: ["/"],
// };

// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   const { nextUrl } = req;

//   // login ページは除外
//   if (nextUrl.pathname.startsWith("/login")) {
//     return NextResponse.next();
//   }

//   // 認証が必要なパス
//   if (!req.auth) {
//     return NextResponse.redirect(new URL("/login", nextUrl.origin));
//   }

//   return NextResponse.next();
// });

// // 適用対象をすべてのページ（/login を除外）
// export const config = {
//   matcher: [
//     "/((?!login|_next/static|_next/image|favicon.ico|api/auth).*)",
//   ],
// };
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;

  // /login は自由にアクセス可能
  if (nextUrl.pathname === "/" ) {
    return NextResponse.next();
  }

  // 認証必須ページのみチェック
  if (nextUrl.pathname.startsWith("/todos") || nextUrl.pathname.startsWith("/account")) {
    if (!req.auth) {
      // 未認証なら login へリダイレクト
      return NextResponse.redirect(
        new URL(`/?callbackUrl=${nextUrl.pathname}`, nextUrl.origin)
      );
    }
  }

  return NextResponse.next();
});

// middleware の対象は認証必須ページのみ
export const config = {
  matcher: ["/todos/:path*", "/account/:path*"],
};

