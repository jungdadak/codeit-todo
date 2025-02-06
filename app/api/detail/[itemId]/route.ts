import { NextResponse } from 'next/server';

// 환경 변수 체크 함수
function checkEnvVariables() {
  const TENANT_ID = process.env.TENANT_ID;
  const API_URL = process.env.API_URL;

  if (!TENANT_ID || !API_URL) {
    return {
      error: true,
      response: NextResponse.json({ error: '환경 변수 누락' }, { status: 500 }),
    };
  }

  return { error: false, TENANT_ID, API_URL };
}

// GET - Todo 상세 조회
export async function GET(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  const env = checkEnvVariables();
  if (env.error) return env.response;

  try {
    const { itemId } = await params;
    const res = await fetch(`${env.API_URL}/${env.TENANT_ID}/items/${itemId}`, {
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

// PATCH - Todo 수정

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  const env = checkEnvVariables();
  if (env.error) return env.response;

  try {
    const { itemId } = await params;
    const numericItemId = parseFloat(itemId); // string을 number로 변환

    if (isNaN(numericItemId)) {
      return NextResponse.json(
        { error: '잘못된 아이템 ID 형식' },
        { status: 400 }
      );
    }

    const body = await req.json();

    const res = await fetch(
      `${env.API_URL}/${env.TENANT_ID}/items/${numericItemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: body.name,
          memo: body.memo || '',
          imageUrl: body.imageUrl || '',
          isCompleted: body.isCompleted,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error('API error response:', errorData);
      return NextResponse.json(
        { error: `API 요청 실패: ${errorData.message || res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}

// DELETE - Todo 삭제
export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  const env = checkEnvVariables();
  if (env.error) return env.response;

  try {
    const { itemId } = params;

    const res = await fetch(`${env.API_URL}/${env.TENANT_ID}/items/${itemId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `API 요청 실패 - ${res.status}` },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: '삭제 완료' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
