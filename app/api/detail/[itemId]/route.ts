import { NextResponse } from 'next/server';
import { Detail_ItemSchema } from '@/utils/schemas';

export async function GET(
  _: Request,
  { params }: { params: { itemId: string } }
) {
  const API_URL = process.env.API_URL;
  const TENANT_ID = process.env.TENANT_ID;

  if (!TENANT_ID || !API_URL)
    return NextResponse.json({ error: '환경 변수 누락' }, { status: 500 });

  try {
    const res = await fetch(`${API_URL}/${TENANT_ID}/items/${params.itemId}`);
    if (!res.ok)
      return NextResponse.json(
        { error: 'API 요청 실패' },
        { status: res.status }
      );

    const data = await res.json();
    const parsedData = Detail_ItemSchema.safeParse(data);
    if (!parsedData.success)
      return NextResponse.json({ error: '응답 검증 실패' }, { status: 500 });

    return NextResponse.json(parsedData.data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
