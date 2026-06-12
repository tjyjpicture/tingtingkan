'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Difficulty, Question, GameSession } from '@/lib/types';
import { getRandomQuestions } from '@/lib/questions';

// Web Speech API 语音合成
const speak = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      reject(new Error('Web Speech API not supported'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
};

export default function GamePage() {
  const searchParams = useSearchParams();
  const difficulty = (searchParams.get('difficulty') as Difficulty) || 'simple';

  const [session, setSession] = useState<GameSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // 初始化游戏 - 从 Supabase 获取题目
  useEffect(() => {
    async function loadQuestions() {
      setIsLoading(true);
      setError(null);

      try {
        const questions = await getRandomQuestions(difficulty, 10);

        if (questions.length === 0) {
          setError('无法加载题目，请稍后重试');
          return;
        }

        setSession({
          questions,
          currentIndex: 0,
          answers: [],
          score: 0,
          difficulty,
        });
      } catch (err) {
        console.error('Error loading questions:', err);
        setError('加载题目时出错，请检查网络连接');
      } finally {
        setIsLoading(false);
      }
    }

    loadQuestions();
  }, [difficulty]);

  // 自动播放当前题目的音频
  useEffect(() => {
    if (session && session.questions[session.currentIndex] && !showResult) {
      playAudio();
    }
  }, [session?.currentIndex]);

  const playAudio = async () => {
    if (!session || isPlaying) return;

    const question = session.questions[session.currentIndex];
    if (!question) return;

    setIsPlaying(true);
    try {
      await speak(question.audio_text);
    } catch (error) {
      console.error('Speech error:', error);
    }
    setIsPlaying(false);
  };

  const handleAnswer = (answer: 'A' | 'B') => {
    if (selectedAnswer || !session) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const question = session.questions[session.currentIndex];
    const isCorrect = answer === question.correct_image;

    const pointsMap = { simple: 10, normal: 20, hard: 30 };
    const points = isCorrect ? pointsMap[difficulty] : 0;

    setSession(prev => prev ? {
      ...prev,
      answers: [...prev.answers, answer],
      score: prev.score + points,
    } : null);
  };

  const nextQuestion = () => {
    if (!session) return;

    if (session.currentIndex >= session.questions.length - 1) {
      setGameEnded(true);
    } else {
      setSelectedAnswer(null);
      setShowResult(false);
      setSession(prev => prev ? {
        ...prev,
        currentIndex: prev.currentIndex + 1,
      } : null);
    }
  };

  // 加载中状态
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl">正在加载题目...</div>
        </div>
      </main>
    );
  }

  // 错误状态
  if (error || !session) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-500 mb-4">{error || '加载失败'}</div>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            返回首页
          </Link>
        </div>
      </main>
    );
  }

  if (gameEnded) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">游戏结束!</h1>
        <p className="text-2xl mb-2">你的得分: {session.score} 分</p>
        <p className="text-lg text-gray-600 mb-8">
          正确: {session.answers.filter((a, i) => a === session.questions[i].correct_image).length} / {session.questions.length}
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            返回首页
          </Link>
          <Link
            href="/leaderboard"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
          >
            查看排行榜
          </Link>
        </div>
      </main>
    );
  }

  const currentQuestion = session.questions[session.currentIndex];

  return (
    <main className="min-h-screen flex flex-col p-4">
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${((session.currentIndex + 1) / session.questions.length) * 100}%` }}
        />
      </div>

      {/* 题目信息 */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">
          题目 {session.currentIndex + 1} / {session.questions.length}
        </span>
        <span className="font-bold">得分: {session.score}</span>
      </div>

      {/* 音频播放按钮 */}
      <div className="flex justify-center mb-6">
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-6 rounded-lg flex items-center gap-2"
        >
          {isPlaying ? '🔊 播放中...' : '🔊 再听一遍'}
        </button>
      </div>

      {/* 图片选项 */}
      <div className="flex-1 grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => handleAnswer('A')}
          disabled={selectedAnswer !== null}
          className={`relative rounded-lg overflow-hidden border-4 transition-all ${
            selectedAnswer === 'A'
              ? currentQuestion.correct_image === 'A'
                ? 'border-green-500'
                : 'border-red-500'
              : 'border-transparent hover:border-blue-300'
          }`}
        >
          <img
            src={currentQuestion.image_a_url}
            alt="选项 A"
            className="w-full object-cover"
          />
          <span className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded">
            A
          </span>
        </button>

        <button
          onClick={() => handleAnswer('B')}
          disabled={selectedAnswer !== null}
          className={`relative rounded-lg overflow-hidden border-4 transition-all ${
            selectedAnswer === 'B'
              ? currentQuestion.correct_image === 'B'
                ? 'border-green-500'
                : 'border-red-500'
              : 'border-transparent hover:border-blue-300'
          }`}
        >
          <img
            src={currentQuestion.image_b_url}
            alt="选项 B"
            className="w-full object-cover"
          />
          <span className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded">
            B
          </span>
        </button>
      </div>

      {/* 结果显示 */}
      {showResult && (
        <div className="text-center mb-6">
          <p className={`text-xl font-bold mb-4 ${
            selectedAnswer === currentQuestion.correct_image ? 'text-green-500' : 'text-red-500'
          }`}>
            {selectedAnswer === currentQuestion.correct_image ? '✓ 正确!' : '✗ 错误'}
          </p>
          <p className="text-gray-600 mb-4">{currentQuestion.audio_text}</p>
          <button
            onClick={nextQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-lg"
          >
            {session.currentIndex >= session.questions.length - 1 ? '查看结果' : '下一题'}
          </button>
        </div>
      )}

      {/* 返回按钮 */}
      <div className="text-center">
        <Link href="/" className="text-blue-500 hover:underline">
          放弃并返回首页
        </Link>
      </div>
    </main>
  );
}
