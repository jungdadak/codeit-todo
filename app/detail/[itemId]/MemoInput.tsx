'use client';

import { useState, useEffect, useRef } from 'react';

// 메모 props 타입
interface MemoInputProps {
  initialMemo: string | null;
  onChange: (memo: string) => void;
}

/**
 * 메모 부분 디스플레이, 변경이 모두 가능한 메모 컴포넌트 입니다.
 */
export default function MemoInput({ initialMemo, onChange }: MemoInputProps) {
  const [text, setText] = useState(initialMemo || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      updateHeight();
    }
  }, [text]);

  const updateHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onChange(newText);
    updateHeight();
  };

  return (
    <div className="w-full">
      <div
        className="w-full h-[311px] bg-cover bg-center rounded-3xl mb-4 relative"
        style={{ backgroundImage: 'url(/img/memo.png)' }}
      >
        <p className="absolute top-4 left-1/2 transform -translate-x-1/2 text-yellow-800 text-18-extra">
          Memo
        </p>

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            placeholder="메모를 추가해 보세요"
            className="w-full mt-10 text-16-md max-h-[210px] bg-transparent resize-none text-center outline-none overflow-y-auto placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
