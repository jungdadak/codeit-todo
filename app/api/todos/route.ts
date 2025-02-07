import { NextResponse } from 'next/server';
import { GetAll_ListSchema } from '@/utils/schemas';

// 보안상 tenantId와 백엔드 주소는 client에 노출하지 않고 api에서 관리합니다.
const API_URL = process.env.API_URL;
const TENANT_ID = process.env.TENANT_ID;

/**
 * swagger 백엔드 api중 itemId가 불필요한 엔드포인트와 통신합니다.
 * getall(모든 todo 조회 -> pagenation을 지원하여 tanstackQuery 무한스크롤로 처리하였습니다. )
 * create -> todo name만 전달하여 todo를 생성합니다.
 */

export async function GET(request: Request) {
  if (!TENANT_ID || !API_URL) {
    return NextResponse.json({ error: '환경 변수 누락' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;

    const res = await fetch(
      `${API_URL}/${TENANT_ID}/items?page=${page}&pageSize=${pageSize}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'API 요청 실패' },
        { status: res.status }
      );
    }

    const data = await res.json();
    const parsedData = GetAll_ListSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json({ error: '응답 검증 실패' }, { status: 500 });
    }

    return NextResponse.json(parsedData.data, { status: 200 });
  } catch {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!TENANT_ID || !API_URL) {
    return NextResponse.json({ error: '환경 변수 누락' }, { status: 500 });
  }

  try {
    const body = await req.json();

    //  요청 데이터 검증
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
