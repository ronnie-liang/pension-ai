const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'DASHSCOPE_API_KEY 未设置' });
  }

  try {
    const { system, messages, max_tokens } = req.body;

    const qwenMessages = [];
    if (system) qwenMessages.push({ role: 'system', content: system });
    if (Array.isArray(messages)) qwenMessages.push(...messages);

    const qwenRes = await fetch(
      'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
          model: 'qwen-plus',
          messages: qwenMessages,
          max_tokens: max_tokens || 2000
        })
      }
    );

    const rawText = await qwenRes.text();

    if (!qwenRes.ok) {
      return res.status(500).json({ error: '千问接口错误 ' + qwenRes.status, detail: rawText });
    }

    const data = JSON.parse(rawText);
    const text = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({
      content: [{ type: 'text', text }]
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
