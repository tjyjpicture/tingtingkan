-- 用户表 (关联 Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 题目表
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audio_text TEXT NOT NULL,
  image_a_url TEXT NOT NULL,
  image_b_url TEXT NOT NULL,
  correct_image TEXT CHECK (correct_image IN ('A', 'B')) NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('simple', 'normal', 'hard')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 分数表
CREATE TABLE IF NOT EXISTS scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  score INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('simple', 'normal', 'hard')) NOT NULL,
  correct_count INTEGER NOT NULL,
  total_questions INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_scores_user_id ON scores(user_id);
CREATE INDEX idx_scores_score ON scores(score DESC);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);

-- RLS 策略
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- 用户可以查看所有用户
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);

-- 用户可以查看所有题目
CREATE POLICY "Questions are viewable by everyone" ON questions FOR SELECT USING (true);

-- 用户可以查看所有分数
CREATE POLICY "Scores are viewable by everyone" ON scores FOR SELECT USING (true);

-- 用户可以插入自己的分数
CREATE POLICY "Users can insert own scores" ON scores FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户可以更新自己的资料
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
