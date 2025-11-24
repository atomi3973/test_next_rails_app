interface TodoCardProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoCard({ title, completed, onToggle, onDelete }: TodoCardProps) {
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-3 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="w-5 h-5 accent-blue-500"
        />
        <span className={`text-gray-800 ${completed ? "line-through text-gray-400" : ""}`}>
          {title}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 transition"
      >
        Delete
      </button>
    </div>
  )
}
