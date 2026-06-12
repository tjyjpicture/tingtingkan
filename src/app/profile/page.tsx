'use client';

import { useState } from 'react';
import Link from 'next/link';

// 模拟用户数据
const mockUser = {
  username: '访客用户',
  scores: [
    { date: '2026-06-10', score: 180, difficulty: 'simple', correct: 9 },
    { date: '2026-06-09', score: 120, difficulty: 'normal', correct: 6 },
    { date: '2026-06-08', score: 90, difficulty: 'simple', correct: 9 },
  ],
};

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">我的成绩</h1>

      {!isLoggedIn ? (
        <div className="text-center">
          <p className="text-gray-600 mb-6">登录后可保存你的成绩</p>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            登录 / 注册
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8 text-center">
            <p className="text-xl font-medium">{mockUser.username}</p>
            <p className="text-gray-500">总游戏次数: {mockUser.scores.length}</p>
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-lg font-medium mb-4">历史成绩</h2>
            <div className="space-y-3">
              {mockUser.scores.map((score, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{score.score} 分</p>
                    <p className="text-sm text-gray-500">{score.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      score.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                      score.difficulty === 'normal' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {score.difficulty === 'simple' ? '简单' : score.difficulty === 'normal' ? '普通' : '困难'}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">正确: {score.correct}/10</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Link
        href="/"
        className="mt-8 text-blue-500 hover:text-blue-600 underline"
      >
        返回首页
      </Link>
    </main>
  );
}
