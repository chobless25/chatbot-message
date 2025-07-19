import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: chatResponse.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error fetching AI response:", error);
    res.status(500).json({ error: "Error fetching AI response" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});

