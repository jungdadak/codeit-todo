import { NextResponse, type NextRequest } from 'next/server';

/**
 * 백엔드 api 스펙중 itemId가 포함된 엔드포인트에 대한 함수들을 모아두었습니다.
 * get, patch, delete 메서드를 포함합니다
 * create의 경우 itemId가 아닌 다른 api 엔드포인트이므로 정의하지 않았습니다. (todos/route.ts에 존재)
 */

/**
 * 보안상 tenantId, api주소는 env에 저장해 둡니다.
 * env파일이 readable 한지 체크합니다.
 */
function checkEnvVariables(): {
  error: boolean;
  response?: Response;
  TENANT_ID?: string;
  API_URL?: string;
} {
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

//detail item (memo, imgurl) 을 포함한 세부 조회 api 입니다.
export async function GET(request: NextRequest): Promise<Response> {
  const env = checkEnvVariables();
  if (env.error && env.response) return env.response;

  try {
    const itemId = request.nextUrl.pathname.split('/').pop(); // URL에서 itemId 추출
    if (!itemId) {
      return NextResponse.json(
        { error: '아이템 ID가 없습니다.' },
        { status: 400 }
      );
    }

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
  } catch {
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}

// todo 업데이트 엔드포인트 입니다. 모든 필드가 포함되어야 합니다.
export async function PATCH(request: NextRequest): Promise<Response> {
  const env = checkEnvVariables();
  if (env.error && env.response) return env.response;

  try {
    const itemId = request.nextUrl.pathname.split('/').pop(); // URL에서 itemId 추출
    if (!itemId) {
      return NextResponse.json(
        { error: '아이템 ID가 없습니다.' },
        { status: 400 }
      );
    }

    const numericItemId = parseFloat(itemId);
    if (isNaN(numericItemId)) {
      return NextResponse.json(
        { error: '잘못된 아이템 ID 형식' },
        { status: 400 }
      );
    }

    const body = await request.json();

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

// todo item 삭제 핸들러 입니다. itemId를 기반으로 삭제 요청을 수행합니다.
export async function DELETE(request: NextRequest): Promise<Response> {
  const env = checkEnvVariables();
  if (env.error && env.response) return env.response;

  try {
    const itemId = request.nextUrl.pathname.split('/').pop(); // URL에서 itemId 추출
    if (!itemId) {
      return NextResponse.json(
        { error: '아이템 ID가 없습니다.' },
        { status: 400 }
      );
    }

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
    return NextResponse.json({ error: '서버 오류 발생', err }, { status: 500 });
  }
}
