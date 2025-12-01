// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"

// console.log("GOOGLE ID:", process.env.AUTH_GOOGLE_ID)
// console.log("GOOGLE SECRET:", process.env.AUTH_GOOGLE_SECRET)
// console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)
// console.log("AUTH_SECRET:", process.env.AUTH_SECRET)
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,
//   callbacks: {
//   async jwt({ token, user, account }) {
//     if (user && account?.id_token) {
//       // user、accountが存在する場合、初回アクセス(google認証した)となり、jwtトークンを作成する。
//       // Google IDトークンを Rails に送信して JWT を取得
//       // railsが返した値をnexxt.jsのjwtに入れている
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id_token: account.id_token }),
//       });
//       const data = await res.json();
      
//       token.id = String(data.user.id);          // Rails userId
//       token.accessToken = data.jwt;     // Rails JWT
//     }
//     return token;
//   },
//   //クッキーから解読してコピーして、入れる、フロントで利用するたびに(useSession()を使用するたびに)このコピーは行われる
//   async session({ session, token }) {
//     session.user.id = token.id as string;
//     //session.accessToken = token.accessToken as string;
//     return session;
//   },
// }
// })

// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";

// console.log("GOOGLE ID:", process.env.AUTH_GOOGLE_ID);
// console.log("GOOGLE SECRET:", process.env.AUTH_GOOGLE_SECRET);
// console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
// console.log("AUTH_SECRET:", process.env.AUTH_SECRET);

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     }),
//   ],
//   secret: process.env.AUTH_SECRET, // 必須
//   callbacks: {
//     async jwt({ token, user, account }) {
//   if (user && account?.id_token) {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id_token: account.id_token }),
//       });

//       // 🚨 STEP 1: レスポンスステータスチェック
//       if (!res.ok) {
//         const errorDetail = await res.text();
//         console.error("Rails API returned non-OK status:", res.status, errorDetail);
//         throw new Error("Rails authentication failed. Status: " + res.status);
//       }
      
//       const data = await res.json();

//       // 🚨 STEP 2: 必要なデータ構造チェック
//       if (!data.user || !data.user.id || !data.jwt) {
//           console.error("Rails response missing user ID or JWT:", data);
//           throw new Error("Invalid data structure received from Rails.");
//       }
      
//       // データが有効な場合のみ代入
//       token.id = String(data.user.id);
//       token.accessToken = data.jwt;
      
//     } catch (error) {
//       console.error("JWT creation failed due to communication or data structure error:", error);
//       // エラーが発生した場合、空のトークンを返し、認証を中断させる
//       // Auth.jsはこれをセッション作成失敗として処理します
//       return {}; 
//     }
//   }
//   return token;
// },
//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       // session.accessToken はフロントには入れない（安全）
//       return session;
//     },
//   },
// });
// auth.ts
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account?.id_token) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: account.id_token }),
          });

          if (!res.ok) {
            const txt = await res.text();
            console.error("Rails API Error:", res.status, txt);
            throw new Error("Rails returned non-OK");
          }

          const data = await res.json();

          if (!data.user?.id || !data.jwt) {
            console.error("Invalid Rails response:", data);
            throw new Error("Invalid Rails response structure");
          }

          token.id = String(data.user.id);
          token.accessToken = data.jwt;

        } catch (err) {
          console.error("JWT callback failed:", err);
          return {};
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
