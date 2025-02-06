// app/api/images/upload/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const TENANT_ID = process.env.TENANT_ID;
  const API_URL = process.env.API_URL;

  if (!TENANT_ID || !API_URL) {
    return NextResponse.json({ error: '환경 변수 누락' }, { status: 500 });
  }

  try {
    const formData = await req.formData();

    const res = await fetch(`${API_URL}/${TENANT_ID}/images/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      console.error('Image upload failed:', res.status, res.statusText);
      const errorData = await res.json().catch(() => ({}));
      console.error('Error data:', errorData);

      return NextResponse.json(
        { error: '이미지 업로드에 실패했습니다.' },
        { status: res.status }
      );
    }

    const data = await res.json();

    // url 키를 imageUrl로 변환하여 응답
    if (!data.url) {
      console.error('Invalid response data:', data);
      return NextResponse.json(
        { error: '서버 응답 형식이 올바르지 않습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl: data.url }, { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
