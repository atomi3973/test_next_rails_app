import { signIn,signOut } from "@/auth";
import { useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  const handleSendToRails = async () => {
    if (!session?.accessToken) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected_route`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await res.json();
    console.log("Rails protected data:", data);
  };

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("google")}>Googleでログイン</button>
      ) : (
        <>
          <button onClick={handleSendToRails}>Railsにアクセス</button>
          <button onClick={() => signOut()}>ログアウト</button>
        </>
      )}
    </div>
  );
}