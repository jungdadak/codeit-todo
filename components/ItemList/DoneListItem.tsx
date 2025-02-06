'use client';

import { TodoItem } from '@/utils/schemas';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface DoneListItemProps {
  todo: TodoItem;
}

export default function DoneListItem({ todo }: DoneListItemProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleStatusChange = async () => {
    try {
      const res = await fetch(`/api/detail/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          isCompleted: !todo.isCompleted,
        }),
      });

      if (!res.ok) {
        throw new Error('상태 변경 실패');
      }

      // 성공 시 페이지 새로고침
      router.refresh();

      toast({
        description: !todo.isCompleted
          ? '완료 목록으로 이동되었습니다.'
          : '할 일로 이동되었습니다.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: '상태 변경 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <div className="w-full m-3 p-3 bg-violet-100 rounded-full flex items-center border-2 border-slate-900 gap-4">
      <button
        onClick={handleStatusChange}
        className="hover:opacity-75 transition-opacity"
      >
        <Image src="/ic/done.svg" alt="mark as todo" width={32} height={32} />
      </button>
      <Link href={`/detail/${todo.id}`}>
        <p>{todo.name}</p>
      </Link>
    </div>
  );
}
