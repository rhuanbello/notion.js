import { Editor } from "@/components/Editor";

export default function Home() {
  return (
    <div className="text-zinc-900 min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black p-8">
      <div className="bg-white w-[1100px] mx-auto rounded-xl min-h-[860px] shadow-sm border-black/20 overflow-hidden grid grid-cols-[16rem_1fr]">
        <aside className="bg-zinc-50 border-r-zinc-100 p-4">
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-red-400"></button>
            <button className="w-3 h-3 rounded-full bg-yellow-400"></button>
            <button className="w-3 h-3 rounded-full bg-green-400"></button>
          </div>
        </aside>
        <main className="p-4">
          <Editor />
        </main>
      </div>
    </div>
  )
}
