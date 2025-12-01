"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    // ログイン中ならサインアウトボタン
    <button onClick={() => signOut({ callbackUrl: "/" })} 
    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
      ログアウト
    </button>
  ) : (
    // ログアウト中ならサインインボタン
    <button onClick={() => signIn("google")} 
    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
      ログイン
    </button>
  );
}