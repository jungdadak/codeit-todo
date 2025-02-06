'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface ButtonGroupProps {
  todoId: number;
  hasChanges: boolean;
  onSave?: () => Promise<void>;
}

export default function ButtonGroup({
  todoId,
  hasChanges,
  onSave,
}: ButtonGroupProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave();
        toast({
          description: '수정이 완료되었습니다.',
        });
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        description: '수정 중 오류가 발생했습니다.',
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/detail/${todoId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('삭제 실패');
      }

      toast({
        description: '삭제되었습니다.',
      });
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        description: '삭제 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <div className="flex justify-center gap-4 lg:justify-end">
      <button
        onClick={handleSave}
        className={`relative w-52 justify-center flex items-center gap-2 px-6 py-2.5 rounded-full 
                   border-2 border-black text-black text-18-bold
                   shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                   hover:bg-opacity-90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                   ${hasChanges ? 'bg-lime-400' : 'bg-slate-200'}`}
      >
        <Image src="/ic/check.svg" alt="check" width={16} height={16} />
        수정 완료
      </button>

      <button
        onClick={handleDelete}
        className="relative w-52 flex justify-center items-center gap-2 px-6 py-2.5 rounded-full 
                   bg-rose-600 border-2 border-black text-white text-18-bold
                   shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                   hover:bg-rose-700 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <Image src="/ic/X.svg" alt="delete" width={16} height={16} />
        삭제하기
      </button>
    </div>
  );
}
