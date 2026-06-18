import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json(); // base64 image

    if (!image) {
      return NextResponse.json({ error: '이미지가 필요합니다.' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "이 이미지에서 카드 결제 내역이나 은행 입출금 내역을 추출해서 JSON 배열 형태로 응답해줘. 각 객체는 'date'(YYYY-MM-DD), 'store_name'(사용처), 'amount'(숫자만), 'category'(식비, 카페, 교통, 쇼핑, 구독, 병원, 교육, 문화, 고정지출, 기타 중 하나), 'is_subscription'(불리언) 필드를 가져야 해. 다른 설명 없이 JSON만 반환해." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    return NextResponse.json(JSON.parse(content || '{}'));
  } catch (error) {
    console.error('AI 분석 에러:', error);
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
