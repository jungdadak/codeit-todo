import SearchBox from '@/components/SearchBox/SearchBox';
import TodoSection from '@/components/Todosection';
import Image from 'next/image';
import { Suspense } from 'react';

function TodoListSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full m-3 p-3 h-14 bg-slate-200 rounded-full"></div>
      <div className="w-full m-3 p-3 h-14 bg-slate-200 rounded-full"></div>
      <div className="w-full m-3 p-3 h-14 bg-slate-200 rounded-full"></div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="text-slate-900">
      <SearchBox />
      <div className="flex flex-col lg:flex-row justify-center gap-5 mt-10">
        <section className="text-center w-full lg:w-1/2">
          <Image src="/img/todo.svg" alt="todo" width={101} height={36} />
          <Suspense fallback={<TodoListSkeleton />}>
            <TodoSection type="todo" />
          </Suspense>
        </section>
        <section className="text-center w-full lg:w-1/2">
          <Image src="/img/done.svg" alt="done" width={101} height={36} />
          <Suspense fallback={<TodoListSkeleton />}>
            <TodoSection type="done" />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
