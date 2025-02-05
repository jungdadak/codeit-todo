import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        nanum: ['NanumSquare', 'sans-serif'], //globals.css에서 나눔스퀘어 임포트, 폴백으로 산셰리프 고딕체 추가하였습니다.
      },
    },
  },
  plugins: [],
} satisfies Config;
