import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignIn from "./sign-in";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* ロゴ */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-600">My Todo App</h1>
        </Link>

        {/* ナビゲーション */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/todos" className="text-gray-700 hover:text-blue-600 transition">
            Todos
          </Link>
        </nav>

        {/* ログインボタン */}
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <SignIn></SignIn>
          </Button>
        </div>
      </div>
    </header>
  );
}
