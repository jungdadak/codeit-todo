// app/detail/[itemId]/page.tsx
import { notFound } from 'next/navigation';
import DetailPageClient from './DetailPageClient';
import type { DetailItem } from '@/utils/schemas';

export default async function DetailPage({
  params,
}: {
  params: { itemId: string };
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const { itemId } = await params;

  try {
    const res = await fetch(`${BASE_URL}/api/detail/${itemId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const todo: DetailItem = await res.json();

    return <DetailPageClient initialData={todo} />;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching todo:', error);
    }
    notFound();
  }
}
