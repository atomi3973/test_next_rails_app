import LoginNotification from "@/components/notification/notification";
import SignIn from "@/components/sign-in";

export default async function HomePage() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <LoginNotification></LoginNotification>
      <h1 className="text-5xl font-bold mb-4 text-blue-600">
        My Todo App
      </h1>
      
      <div className="flex gap-4">
        <SignIn></SignIn>
      </div>

      <footer className="mt-12 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} My Todo App
      </footer>
    </main>
  )
}

