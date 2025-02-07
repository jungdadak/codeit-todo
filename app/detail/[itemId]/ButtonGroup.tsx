'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

/**
 * 버튼은 tailwind base components로 중복 스타일을 재활용 했습니다.
 * 수정 버튼은 setTimeout으로 수정이 적용된 것을 잠시 확인시키고 홈페이지로 리디렉션 합니다.
 */

/**
 * patch, delete 모두 itemId 기반이기에 정의
 * 수정하기 버튼은 change가 생길 경우 색이 바뀌기 때문에 hasChanges 추가
 */
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
          description: '수정이 완료되었습니다. \n 홈페이지로 이동합니다.',
        });
        setTimeout(() => {
          router.push('/');
        }, 900);
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
        className={`btn-base ${
          hasChanges ? 'bg-lime-300' : 'bg-slate-200'
        } btn-save`}
      >
        <Image src="/ic/check.svg" alt="check" width={16} height={16} />
        수정 완료
      </button>

      <button onClick={handleDelete} className="btn-base btn-delete">
        <Image src="/ic/X.svg" alt="delete" width={16} height={16} />
        삭제하기
      </button>
    </div>
  );
}
