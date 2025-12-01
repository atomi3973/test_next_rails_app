"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <button
      onClick={() => signIn("google")}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Googleサインイン
    </button>
      
  );
}
