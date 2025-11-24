import { getItems } from "@/actions/getItems";


export default async function HomePage() {
  const items = await getItems();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-5xl font-bold mb-4 text-blue-600">
        My Todo App
      </h1>
      
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          ログイン
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          登録
        </a>
      </div>

      <footer className="mt-12 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} My Todo App
      </footer>
      <div>
      <h1>Posts</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            {item.description}
          </li>
          
        ))}
      </ul>
    </div>
    </main>
  )
}

