import { Question, Difficulty } from './types';
import { supabase } from './supabase';

// 从 Supabase 获取所有题目
export async function getAllQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }

  return data || [];
}

// 根据难度获取题目
export async function getQuestionsByDifficulty(difficulty: Difficulty): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('difficulty', difficulty)
    .order('id');

  if (error) {
    console.error('Error fetching questions by difficulty:', error);
    return [];
  }

  return data || [];
}

// 根据难度随机选择指定数量的题目
export async function getRandomQuestions(difficulty: Difficulty, count: number = 10): Promise<Question[]> {
  const questions = await getQuestionsByDifficulty(difficulty);

  // Fisher-Yates 洗牌算法
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

// 根据 ID 获取单个题目
export async function getQuestionById(id: string): Promise<Question | null> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching question:', error);
    return null;
  }

  return data;
}
