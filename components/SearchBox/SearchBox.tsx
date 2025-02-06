'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTodoActions } from '@/utils/todoActions';

export default function SearchBox() {
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();
  const { createTodo } = useTodoActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim().length < 3) {
      toast({
        title: '❌ 오류',
        description: '3글자 이상 입력하세요!',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createTodo(inputValue);
      setInputValue('');
    } catch (err) {
      console.error('❌ 요청 실패:', err);
    }
  };

  return (
    <div className="w-full p-1">
      <form
        onSubmit={handleSubmit}
        className="w-full flex gap-2 items-center flex-nowrap"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 min-w-0 px-6 py-3 rounded-full border-2 border-slate-800 
               bg-slate-100 placeholder-slate-400 focus:outline-none 
               shadow-[2px_2px_0_rgb(15,23,42)]
               whitespace-nowrap"
          placeholder="할 일을 입력해 주세요"
        />
        <button
          type="submit"
          className={`rounded-full border-2 border-slate-800 
               font-medium
               shadow-[2px_2px_0_rgb(15,23,42)]
               flex items-center justify-center gap-2
               transition-all
               ${
                 inputValue
                   ? 'bg-violet-600 hover:bg-violet-700 text-slate-900'
                   : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
               }
               md:w-[168px] md:px-5 md:py-3
               w-12 px-3 py-3`}
          style={{ minWidth: '48px' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8L14 8"
              stroke={inputValue ? 'white' : 'black'}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 14L8 2"
              stroke={inputValue ? 'white' : 'black'}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="hidden md:inline whitespace-nowrap">추가하기</span>
        </button>
      </form>
    </div>
  );
}
