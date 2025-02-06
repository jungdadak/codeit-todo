'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import TodoList from '@/components/ItemList/TodoList';
import DoneList from '@/components/ItemList/DoneList';
import TodoEmpty from '@/components/Empty/TodoEmpty';
import DoneEmpty from '@/components/Empty/DoneEmpty';
import { TodoItem } from '@/utils/schemas';

interface TodoSectionClientProps {
  type: 'todo' | 'done';
  initialData: TodoItem[];
}

async function fetchTodos(page: number) {
  const res = await fetch(`/api/todos?page=${page}&pageSize=10`);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export default function TodoSectionClient({
  type,
  initialData,
}: TodoSectionClientProps) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['todos', type],
      queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 todos를 하나의 배열로 합치기
  const allTodos = data?.pages.flat() ?? [];

  // todo/done 필터링
  const filteredTodos = allTodos.filter((todo) =>
    type === 'todo' ? !todo.isCompleted : todo.isCompleted
  );

  if (status === 'error') {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  if (filteredTodos.length === 0) {
    return type === 'todo' ? <TodoEmpty /> : <DoneEmpty />;
  }

  return (
    <div>
      {type === 'todo' ? (
        <TodoList todos={filteredTodos} />
      ) : (
        <DoneList todos={filteredTodos} />
      )}

      <div ref={ref} className="h-10">
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
          </div>
        )}
      </div>
    </div>
  );
}
