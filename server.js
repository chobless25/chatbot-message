require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `${process.env.OPENAI_API_BASE}/chat/completions`,
      {
        model: process.env.MODEL,
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://portfolio-projec.netlify.app/', // use your actual URL
          'X-Title': 'MyChatbot'
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error fetching AI response:', error.message);
    res.status(500).json({ error: 'Error fetching AI response' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

