'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';
import MemoInput from './MemoInput';
import ButtonGroup from './ButtonGroup';
import type { DetailItem } from '@/utils/schemas';
import NameInput from './NameInput';

interface DetailPageClientProps {
  initialData: DetailItem;
}
/**
 * Detail page 의 clientComponent 부분 입니다.
 * Name, ImageUpload, Memo , Button 부분을 컴포넌트화하여 분리하였습니다.
 */

export default function DetailPageClient({
  initialData,
}: DetailPageClientProps) {
  const [todoData, setTodoData] = useState<DetailItem>(initialData);
  // todo 이름은 3글자 이상 이므로 Null 일수 없음
  const [name, setName] = useState<string>(initialData.name);
  const [memo, setMemo] = useState<string | null>(initialData.memo);
  const [imageUrl, setImageUrl] = useState<string | null>(initialData.imageUrl);
  const [isCompleted, setIsCompleted] = useState<boolean>(
    initialData.isCompleted
  );
  const { toast } = useToast();

  /**변경 사항을 감지하는 변수: 기존 데이터에서 만든 state필드에 변경이 감지시 true반환합니다.
   * isCompleted 섹션의 경우 홈페이지에서 수정중 이므로 수정하지 않습니다.
   */
  const hasChanges =
    memo !== todoData.memo ||
    imageUrl !== todoData.imageUrl ||
    name !== todoData.name ||
    isCompleted !== todoData.isCompleted;

  /**
   * 수정사항을 저장할때 사용되는 비동기 함수
   * swagger update DTO 에 모든 필드가 정의되어 있어 모든 필드 사용하였습니다.
   */
  const handleSave = async () => {
    try {
      //업데이트할 데이터 필드 정의
      const updateData = {
        name: name,
        memo: memo || '',
        imageUrl: imageUrl || '',
        isCompleted: isCompleted,
      };

      const res = await fetch(`/api/detail/${todoData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        //직렬화하여 바디에 포함
        body: JSON.stringify(updateData),
      });
      // fetch 프로미스가 실패할 경우 에러데이터로 간주하고, 에러처리
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '수정 실패');
      }
      // 프로미스 성공시 initial 데이터를 업데이트 데이터로 갈아치움
      const updatedData: DetailItem = await res.json();
      setTodoData(updatedData);
      setMemo(updatedData.memo);
      setImageUrl(updatedData.imageUrl);
      setName(updateData.name);

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

  /**
   * detail 에서 iscompleted의 경우 아이콘과 배경이 변경되어야 하기에 따로 patch
   */
  const handleToggleCompleted = () => {
    setIsCompleted(!isCompleted); // UI 상태만 업데이트
  };

  return (
    <div className="w-full h-screen p-2">
      <div className="w-full mb-4">
        <NameInput
          initialName={name}
          isCompleted={isCompleted}
          onNameChange={setName}
          // name은 3글자 이상이어야 하기에 포커스 잃을 경우 자동 저장용 props로 넘겨줍니다.
          onBlurSave={handleSave}
          onToggleCompleted={handleToggleCompleted}
        />
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
