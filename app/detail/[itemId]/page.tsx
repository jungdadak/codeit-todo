// app/detail/[itemId]/page.tsx
import { notFound } from 'next/navigation';
import DetailPageClient from './DetailPageClient';
import type { DetailItem } from '@/utils/schemas';

// 서버 컴포넌트에서는 params가 Promise 형태로 넘어오므로,
// props 타입을 Promise<{ itemId: string }>로 명시합니다.
export default async function DetailPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  // await를 사용하여 params를 언래핑합니다.
  const { itemId } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${BASE_URL}/api/detail/${itemId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }

    const todo: DetailItem = await res.json();

    return <DetailPageClient initialData={todo} />;
  } catch (error) {
    if (error instanceof Error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
    notFound();
  }
}
