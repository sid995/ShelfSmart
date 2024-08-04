import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates recipes with titles." },
        { role: "user", content: `Generate a recipe based on the following request: ${prompt}. Provide the recipe title on the first line, followed by a blank line, and then the recipe details.` }
      ],
      max_tokens: 500,
    });

    const content = completion.choices[0].message.content?.trim() || '';
    const [title, ...recipeParts] = content.split('\n\n');

    return NextResponse.json({
      title: title.trim(),
      recipe: recipeParts.join('\n\n').trim(),
    });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return NextResponse.json({ error: 'Failed to generate recipe' }, { status: 500 });
  }
}