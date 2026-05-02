const express = require('express');
const router = express.Router();
const { YoutubeTranscript } = require('youtube-transcript');
const OpenAI = require('openai');

// Helper function to get OpenAI instance
function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your_key_here' || !apiKey) {
    throw new Error('OPENAI_API_KEY is missing. Please add it to server/.env and restart the server.');
  }
  return new OpenAI({ apiKey });
}

// Helper function to extract Video ID
function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

router.post('/', async (req, res) => {
  const { url, persona = 'Influencer' } = req.body;

  if (!url) return res.status(400).json({ error: 'YouTube URL is required' });

  const videoId = extractVideoId(url);
  if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

  try {
    // 1. Fetch transcript using the original library
    let fullTranscript = '';
    try {
      const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
      fullTranscript = transcriptArray.map(item => item.text).join(' ');
    } catch (transcriptError) {
      console.error('Transcript error:', transcriptError);
      if (transcriptError.message.includes('Too Many Requests')) {
        return res.status(429).json({ error: 'YouTube is rate-limiting requests. Please wait a few minutes and try again.' });
      }
      return res.status(404).json({ error: 'Could not find a transcript for this video. Try one with captions enabled.' });
    }

    if (!fullTranscript || fullTranscript.trim().length < 20) {
      return res.status(404).json({ error: 'Transcript not found or too short.' });
    }

    // 2. Send to OpenAI
    const openai = getOpenAI();
    const prompt = `You are an expert content strategist and viral growth expert.

Transcript:
"${fullTranscript}"

Based on the transcript and selected persona ("${persona}"), analyze the video and generate 3 viral short-form clips.

For each clip return:
- start_time (mm:ss)
- end_time (mm:ss)
- title
- hook
- caption
- virality_score (1-10)
- reason (why it works)
- before_after (object with "original" line and "improved" viral version)
- performance (object with "views_potential" [High|Medium|Low], "engagement_score" [1-10], and "reason")
- hashtags (array of 5-8 relevant tags)

Also generate:
- content_feedback (object with "weaknesses" array and "improvements" array critiquing the original content)
- blog (title, summary, key_points)
- repurpose (instagram, linkedin, twitter)

Return ONLY valid JSON in this exact structure:
{
  "clips": [ ... ],
  "content_feedback": { "weaknesses": [...], "improvements": [...] },
  "blog": { ... },
  "repurpose": { ... }
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        { role: "system", content: "You are a helpful assistant that returns JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(response.choices[0].message.content));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

module.exports = router;
