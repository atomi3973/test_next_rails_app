"use client";

import { useSearchParams } from "next/navigation";

export default function AuthNotification() {
  const searchParams = useSearchParams();
  const loginRequired = searchParams.get("callbackUrl"); // ログインが必要な場合
  const loggedOut = searchParams.get("loggedOut");       // ログアウト後の場合

  if (!loginRequired && !loggedOut) return null;

  // 表示内容とスタイルを決定
  const message = loginRequired
    ? "ログインしてください"
    : "ログアウトしました";

  const bgColor = loginRequired ? "bg-red-100" : "bg-green-100";
  const textColor = loginRequired ? "text-red-800" : "text-green-800";

  return (
    <div className={`${bgColor} ${textColor} p-2 rounded`}>
      {message}
    </div>
  );
}