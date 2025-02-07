'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { TodoItem } from '@/utils/schemas';

/**
 * 할 일(Todo) 관련된 액션을 관리하는 커스텀 훅
 * 백엔드 api와 통신하는 nextjs api에 연결시 호출하여 사용합니다.
 */
export function useTodoActions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  /**
   * `todos` 키를 가진 캐시 데이터를 무효화하여 최신 데이터를 다시 불러오도록 함
   */
  const invalidateTodos = () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  };

  /**
   * 할 일의 완료 상태를 변경하는 함수
   * @param todo 변경할 할 일 아이템
   */
  const updateTodoStatus = async (todo: TodoItem) => {
    try {
      // 해당 todo의 최신 데이터를 먼저 fetch
      const getRes = await fetch(`/api/detail/${todo.id}`);
      if (!getRes.ok) throw new Error('최신 데이터 조회 실패');
      const currentData = await getRes.json();

      const res = await fetch(`/api/detail/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentData.name,
          memo: currentData.memo || '',
          imageUrl: currentData.imageUrl || '',
          isCompleted: !currentData.isCompleted,
        }),
      });

      if (!res.ok) throw new Error('상태 변경 실패');
      // 변경된 데이터를 다시 불러오기 위해 캐시 무효화
      invalidateTodos();

      toast({
        description: !todo.isCompleted
          ? '완료 목록으로 이동되었습니다.'
          : '할 일 목록으로 이동되었습니다.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: '상태 변경 중 오류가 발생했습니다.',
      });
    }
  };

  /**
   * 할 일을 삭제하는 함수
   * @param todoId 삭제할 할 일의 ID
   */
  const deleteTodo = async (todoId: number) => {
    try {
      const res = await fetch(`/api/detail/${todoId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('삭제 실패');

      invalidateTodos();

      toast({
        description: '삭제되었습니다.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: '삭제 중 오류가 발생했습니다.',
      });
    }
  };

  /**
   * 새로운 할 일을 생성하는 함수
   * @param name 새로 추가할 할 일의 이름
   */
  const createTodo = async (name: string) => {
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error('생성 실패');

      invalidateTodos();

      toast({
        description: '새로운 할 일이 추가되었습니다.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: '추가 중 오류가 발생했습니다.',
      });
    }
  };

  return {
    updateTodoStatus,
    deleteTodo,
    createTodo,
  };
}
