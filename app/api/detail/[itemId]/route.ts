import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { itemId: string } } // ✅ 비동기적으로 접근하지 않음
) {
  const TENANT_ID = process.env.TENANT_ID;
  const API_URL = process.env.API_URL;

  if (!TENANT_ID || !API_URL) {
    return NextResponse.json({ error: '환경 변수 누락' }, { status: 500 });
  }

  try {
    // ✅ params.itemId를 동기적으로 사용 (async/await 사용 금지)
    const { itemId } = await params;

    const res = await fetch(`${API_URL}/${TENANT_ID}/items/${itemId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `API 요청 실패 - ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
