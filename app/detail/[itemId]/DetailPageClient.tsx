'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';
import MemoInput from './MemoInput';
import ButtonGroup from './ButtonGroup';
import type { DetailItem } from '@/utils/schemas';

interface DetailPageClientProps {
  initialData: DetailItem;
}

export default function DetailPageClient({
  initialData,
}: DetailPageClientProps) {
  const [todoData, setTodoData] = useState<DetailItem>(initialData);
  const [memo, setMemo] = useState<string | null>(initialData.memo);
  const [imageUrl, setImageUrl] = useState<string | null>(initialData.imageUrl);
  const { toast } = useToast();

  const hasChanges = memo !== todoData.memo || imageUrl !== todoData.imageUrl;

  const handleSave = async () => {
    try {
      const updateData = {
        name: todoData.name,
        memo: memo || '',
        imageUrl: imageUrl || '',
        isCompleted: todoData.isCompleted,
      };

      const res = await fetch(`/api/detail/${todoData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '수정 실패');
      }

      const updatedData: DetailItem = await res.json();
      setTodoData(updatedData);
      setMemo(updatedData.memo);
      setImageUrl(updatedData.imageUrl);

      toast({
        description: '수정이 완료되었습니다.',
      });
    } catch (error) {
      console.error('Error details:', error);
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : '수정 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <div className="w-full h-screen p-2">
      <div className="w-full mb-4">
        <div
          className={`${
            todoData.isCompleted ? 'bg-violet-100' : 'bg-slate-100'
          } rounded-3xl flex items-center justify-center border-2 border-slate-900 py-3 px-4`}
        >
          <Image
            src={todoData.isCompleted ? '/ic/done.svg' : '/ic/todo.svg'}
            alt="todo-list"
            width={32}
            height={32}
          />
          <h1 className="text-xl ml-4 underline">{todoData.name}</h1>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-4">
        <ImageUpload initialImage={imageUrl} onImageChange={setImageUrl} />
        <MemoInput initialMemo={memo} onChange={setMemo} />
      </div>

      <ButtonGroup
        todoId={todoData.id}
        hasChanges={hasChanges}
        onSave={handleSave}
      />
    </div>
  );
}
