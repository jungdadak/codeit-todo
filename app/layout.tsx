import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/Nav/Navbar';
export const metadata: Metadata = {
  title: 'Andy Lee Todos',
  description: 'Andy Lee 투두앱 입니다.',
  /**
   * 파비콘 설정 (브라우저 자동)
   */
  icons: {
    icon: [
      { url: '/favicon.svg', sizes: '32x32' },
      { url: '/favicon.svg', sizes: '48x48' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 부드러운 폰트를 위한 안티앨리어스 */}
      <body className="antialiased bg-slate-200">
        <NavBar />
        <main className="max-w-7xl">{children}</main>
      </body>
    </html>
  );
}
