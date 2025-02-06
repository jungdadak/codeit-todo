'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { TodoItem } from '@/utils/schemas';

export function useTodoActions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const invalidateTodos = () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  };

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
