'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import TodoList from '@/components/ItemList/TodoList';
import DoneList from '@/components/ItemList/DoneList';
import TodoEmpty from '@/components/Empty/TodoEmpty';
import DoneEmpty from '@/components/Empty/DoneEmpty';
import type { TodoItem } from '@/utils/schemas';

interface TodoSectionClientProps {
  type: 'todo' | 'done';
  initialData: TodoItem[];
}

async function fetchTodoPage(pageParam: number) {
  const res = await fetch(`/api/todos?page=${pageParam}&pageSize=10`);
  if (!res.ok) throw new Error('Network response was not ok');
  const data = await res.json();
  return {
    items: data,
    nextPage: data.length === 10 ? pageParam + 1 : undefined,
  };
}

export default function TodoSectionClient({
  type,
  initialData,
}: TodoSectionClientProps) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1, // 10% 정도만 보여도 감지
    rootMargin: '-50px 0px', // 뷰포트 하단에서 50px 위에서 감지
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['todos', type],
      queryFn: ({ pageParam }) => fetchTodoPage(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialData: {
        pages: [
          {
            items: initialData,
            nextPage: initialData.length === 10 ? 2 : undefined,
          },
        ],
        pageParams: [1],
      },
    });

  // 초기 마운트 시 즉시 fetch 방지
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldFetch(true);
    }, 1000); // 1초 후에 fetch 허용

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && shouldFetch) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage, shouldFetch]);

  const allTodos = data?.pages.flatMap((page) => page.items) ?? [];
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

      <div ref={ref} className="h-20">
        {' '}
        {/* 높이를 더 크게 */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
          </div>
        )}
      </div>
    </div>
  );
}
