import * as dotenv from 'dotenv';
dotenv.config();   

import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data[0].url;
    res.send({ image });
  } catch (err) {
    console.error('OpenAI error details:', JSON.stringify(err, null, 2));

    const errorType = err?.response?.data?.error?.type || err?.type;
    if (errorType === "image_generation_user_error") {
      return res.status(400).send({
        error: "Your prompt may have triggered OpenAI's safety filters. Try rephrasing it.",
      });
    }
    
    res.status(500).send({
      error: err.message || "Failed to generate image."
    });
  }
});

app.listen(8080, () => console.log('c'));