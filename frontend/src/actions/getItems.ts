import { ItemsSchema } from "@/lib/schemas";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getItems() {
  const res = await fetch(`${apiUrl}/items`, {
    // サーバー側から fetch するのでブラウザ側キャッシュを無効化
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!res.ok) {
    throw new Error("データ取得に失敗しました");
  }

  const data = await res.json();

  return ItemsSchema.parse(data);
}