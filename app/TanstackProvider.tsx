'use client';
// app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * 이미 삭제된 항목이 캐시에 남아 있어
 * 모든 필드에서 캐시를 사용하지 않고 최신 데이터를 사용하기 위해
 * 옵션 설정을 추가했습니다.
 */
export default function TanstackProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0, // 항상 최신 데이터를 요청
            gcTime: 0, // 가비지 컬렉션 타임 (이전의 cacheTime)
            refetchOnWindowFocus: true, // 윈도우 포커스시 새로고침
            retry: false, // 실패시 재시도 하지 않음
            refetchOnMount: true, // 컴포넌트 마운트시 새로고침
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
