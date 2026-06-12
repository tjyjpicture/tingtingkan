# 听听看 - 英语听力图片匹配游戏

一个帮助用户提高英语听力理解能力的互动游戏。用户听英文描述，从两张图片中选择匹配的一张。

## 功能特点

- 🎮 **三种难度级别**：简单、普通、困难，适合不同水平的学习者
- 🔊 **语音合成**：使用 Web Speech API 将英文题目朗读出来
- 📊 **排行榜系统**：查看全球玩家排名
- 👤 **用户档案**：保存个人成绩历史
- 🎨 **现代 UI**：使用 Tailwind CSS 构建，响应式设计

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **后端服务**: Supabase (认证 + 数据库)
- **部署**: Vercel
- **语音**: Web Speech API (浏览器原生)

## 项目结构

```
tingtingkan/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 首页（难度选择）
│   │   ├── game/page.tsx     # 游戏页面
│   │   ├── leaderboard/page.tsx  # 排行榜
│   │   └── profile/page.tsx  # 用户档案
│   ├── lib/
│   │   ├── questions.ts      # 30 道预设题目
│   │   ├── types.ts          # TypeScript 类型定义
│   │   └── supabase.ts       # Supabase 客户端
│   └── ...
├── supabase/
│   └── schema.sql            # 数据库表结构
└── ...
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local.example` 到 `.env.local` 并填入你的 Supabase 配置：

```bash
cp .env.local.example .env.local
```

在 `.env.local` 中填入：
- `NEXT_PUBLIC_SUPABASE_URL`: 你的 Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 你的 Supabase 匿名密钥

### 3. 创建 Supabase 数据库

在 Supabase SQL 编辑器中执行 `supabase/schema.sql` 文件的内容。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 游戏规则

1. **选择难度**：简单（10 分/题）、普通（20 分/题）、困难（30 分/题）
2. **听音频**：点击播放按钮听英文描述
3. **选图片**：从 A 和 B 两张图片中选择正确的一张
4. **累积分数**：每局游戏 10 道题，根据正确率和难度计算总分
5. **查看排名**：在排行榜中查看你的成绩

## 开发进度

### ✅ 已完成
- [x] 项目初始化和配置
- [x] 核心游戏 UI（首页、游戏页、结果页）
- [x] 30 道预设题目（每个难度 10 道）
- [x] Web Speech API 语音播放
- [x] 分数计算和显示
- [x] 基础排行榜和用户档案页面

### 🚧 进行中
- [ ] Supabase 数据库集成
- [ ] 用户认证系统
- [ ] 分数保存到数据库

### 📅 待开发
- [ ] API 路由实现
- [ ] 测试和部署
- [ ] AI 生成题目功能（后期）

## 数据库表结构

### users 表
- `id`: 用户 ID（关联 Supabase Auth）
- `username`: 用户名
- `created_at`: 创建时间

### questions 表
- `id`: 题目 ID
- `audio_text`: 英文描述文本
- `image_a_url`: 图片 A 的 URL
- `image_b_url`: 图片 B 的 URL
- `correct_image`: 正确答案（'A' 或 'B'）
- `difficulty`: 难度级别
- `created_at`: 创建时间

### scores 表
- `id`: 分数 ID
- `user_id`: 用户 ID
- `score`: 分数
- `difficulty`: 难度级别
- `correct_count`: 正确数量
- `total_questions`: 总题目数
- `created_at`: 创建时间

## 部署

项目可以轻松部署到 Vercel：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 点击部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tingtingkan)

## 贡献

欢迎贡献代码！请随时提交 Issue 或 Pull Request。

## 许可证

MIT License
