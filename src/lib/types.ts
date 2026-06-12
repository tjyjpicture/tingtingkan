export type Difficulty = 'simple' | 'normal' | 'hard';

export interface Question {
  id: string;
  audio_text: string;
  image_a_url: string;
  image_b_url: string;
  correct_image: 'A' | 'B';
  difficulty: Difficulty;
  created_at: string;
}

export interface Score {
  id: string;
  user_id: string;
  score: number;
  difficulty: Difficulty;
  correct_count: number;
  total_questions: number;
  created_at: string;
}

export interface User {
  id: string;
  username: string;
  created_at: string;
}

export interface GameSession {
  questions: Question[];
  currentIndex: number;
  answers: ('A' | 'B')[];
  score: number;
  difficulty: Difficulty;
}
