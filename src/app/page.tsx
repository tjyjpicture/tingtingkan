import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">听听看</h1>
      <p className="text-xl text-gray-600 mb-8">英语听力图片匹配游戏</p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <h2 className="text-lg font-medium text-center mb-2">选择难度开始游戏</h2>

        <Link
          href="/game?difficulty=simple"
          className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg text-center text-lg font-medium transition-colors"
        >
          简单 (10分/题)
        </Link>

        <Link
          href="/game?difficulty=normal"
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg text-center text-lg font-medium transition-colors"
        >
          普通 (20分/题)
        </Link>

        <Link
          href="/game?difficulty=hard"
          className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg text-center text-lg font-medium transition-colors"
        >
          困难 (30分/题)
        </Link>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/leaderboard"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          排行榜
        </Link>
        <Link
          href="/profile"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          我的成绩
        </Link>
      </div>
    </main>
  );
}
