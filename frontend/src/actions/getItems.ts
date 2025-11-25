import { ItemsSchema } from "@/lib/schemas";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//Item全件取得
export async function getItems() {
  const res = await fetch(`${API_URL}/items`, {
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

//Item投稿
export async function postItem() {
  //開発環境では"http://localhost:3001/items"をかく。クライアントから送っているので、ブラウザ経由
  await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "test", description: "test" }),
    });
}