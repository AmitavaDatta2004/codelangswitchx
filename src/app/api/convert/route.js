

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { sourceCode, sourceLanguage, targetLanguage } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Convert the following ${sourceLanguage} code to ${targetLanguage}:

${sourceCode}

Please provide only the converted code without any explanations.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ convertedCode: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred during conversion' }, { status: 500 });
  }
}