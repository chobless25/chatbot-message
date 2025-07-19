const fetch = require('node-fetch');
require('dotenv').config();

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // or try another like 'mistralai/mistral-7b-instruct'
        messages: [{ role: "user", content: userMessage }]
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "Invalid response from OpenRouter" });
    }
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    res.status(500).json({ error: "Error fetching AI response" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});

