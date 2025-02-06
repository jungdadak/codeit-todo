'use client';

import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/components/ui/toast'; // ✅ ToastProvider 추가

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {' '}
      {/* ✅ ToastProvider로 감싸기 */}
      {children}
      <Toaster /> {/* ✅ Toast 메시지 UI */}
    </ToastProvider>
  );
}
