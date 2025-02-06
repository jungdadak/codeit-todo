import { NextResponse } from 'next/server';
import { GetAll_ListSchema } from '@/utils/schemas';

const API_URL = process.env.API_URL;
const TENANT_ID = process.env.TENANT_ID;

export async function GET() {
  if (!TENANT_ID || !API_URL) {
    return NextResponse.json({ error: '환경 변수 누락' }, { status: 500 });
  }

  try {
    const res = await fetch(`${API_URL}/${TENANT_ID}/items`);
    if (!res.ok)
      return NextResponse.json(
        { error: 'API 요청 실패' },
        { status: res.status }
      );

    const data = await res.json();
    const parsedData = GetAll_ListSchema.safeParse(data);
    if (!parsedData.success)
      return NextResponse.json({ error: '응답 검증 실패' }, { status: 500 });

    return NextResponse.json(parsedData.data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
export async function POST(req: Request) {
  if (!TENANT_ID || !API_URL) {
    return NextResponse.json({ error: '환경 변수 누락' }, { status: 500 });
  }

  try {
    const body = await req.json();

    // ✅ 요청 데이터 검증
    if (
      !body.name ||
      typeof body.name !== 'string' ||
      body.name.trim().length < 3
    ) {
      return NextResponse.json(
        { error: '이름은 최소 3글자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/${TENANT_ID}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: body.name }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: '외부 서버 오류' },
        { status: res.status }
      );
    }

    const newTodo = await res.json();
    return NextResponse.json(newTodo, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: '서버 오류 발생', details: String(err) },
      { status: 500 }
    );
  }
}
