# PensionAI · 智能养老金资产配置顾问

## 5分钟部署到 Vercel（完全免费）

### 第一步：注册 GitHub 账号
👉 https://github.com → Sign up（免费）

### 第二步：上传项目文件
1. 登录 GitHub 后，点击右上角 **"+"** → **New repository**
2. Repository name 填：`pension-ai`
3. 点击 **Create repository**
4. 点击 **uploading an existing file**
5. 把这个压缩包里的所有文件**原样拖入**（保持 api/ 和 public/ 的文件夹结构）
6. 点击 **Commit changes**

### 第三步：注册 Vercel 并部署
👉 https://vercel.com → 用 GitHub 账号登录

1. 点击 **"Add New Project"**
2. 找到 `pension-ai` 仓库，点击 **Import**
3. 点击 **Environment Variables**，添加：
   - Key: `ANTHROPIC_API_KEY`
   - Value: 你的 Claude API Key（从 https://console.anthropic.com 获取）
4. 点击 **Deploy**

### 第四步：获取链接
部署完成后（约1分钟），Vercel 会给你一个链接，例如：
`https://pension-ai-xxx.vercel.app`

✅ 这个链接可以直接发给投资人，无需安装任何东西！

---

## 获取 API Key
1. 访问 https://console.anthropic.com
2. 注册/登录后点击左侧 **API Keys**
3. 点击 **Create Key**，复制保存

新账号有免费额度，演示使用完全够用。

---

## 项目结构
```
pension-ai/
├── api/
│   └── chat.js          ← API代理（隐藏你的Key，安全）
├── public/
│   └── index.html       ← 主页面
├── vercel.json          ← Vercel配置
└── package.json
```
