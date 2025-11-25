"use client";

import { postItem } from "@/actions/getItems";
import { Button } from "../ui/button";

export default function AddItemButton() {
  return (
    <Button onClick={postItem}>テスト投稿</Button>
  )
}
