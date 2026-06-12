import Link from 'next/link';

// 模拟排行榜数据
const mockLeaderboard = [
  { rank: 1, username: '小明', score: 280, difficulty: 'hard' },
  { rank: 2, username: 'Alice', score: 250, difficulty: 'hard' },
  { rank: 3, username: '张三', score: 220, difficulty: 'normal' },
  { rank: 4, username: 'Bob', score: 200, difficulty: 'normal' },
  { rank: 5, username: '李四', score: 180, difficulty: 'simple' },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">排行榜</h1>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">排名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">用户</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">分数</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">难度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLeaderboard.map((entry) => (
                <tr key={entry.rank}>
                  <td className="px-4 py-3 text-sm">
                    {entry.rank <= 3 ? (
                      <span className="text-lg">
                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                      </span>
                    ) : (
                      entry.rank
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{entry.username}</td>
                  <td className="px-4 py-3 text-sm">{entry.score}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      entry.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                      entry.difficulty === 'normal' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {entry.difficulty === 'simple' ? '简单' : entry.difficulty === 'normal' ? '普通' : '困难'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 text-blue-500 hover:text-blue-600 underline"
      >
        返回首页
      </Link>
    </main>
  );
}
