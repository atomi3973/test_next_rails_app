// /lib/schemas.ts
import { z } from "zod";

// 1件のPostデータ
export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

// 配列の型
export const ItemsSchema = z.array(ItemSchema);

// TypeScript 型自動生成
export type Item = z.infer<typeof ItemSchema>;
export type Items = z.infer<typeof ItemSchema>;