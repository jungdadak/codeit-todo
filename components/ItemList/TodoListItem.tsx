'use client';

import { TodoItem } from '@/utils/schemas';
import Image from 'next/image';
import Link from 'next/link';
import { useTodoActions } from '@/utils/todoActions';

interface TodoListItemProps {
  todo: TodoItem;
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  const { updateTodoStatus } = useTodoActions();

  return (
    <div className="w-full my-3 p-3 bg-slate-100 rounded-full flex items-center border-2 border-slate-900 gap-4">
      <button
        onClick={() => updateTodoStatus(todo)}
        className="hover:opacity-75 transition-opacity"
      >
        <Image src="/ic/todo.svg" alt="mark as done" width={32} height={32} />
      </button>
      <Link href={`/detail/${todo.id}`}>
        <p>{todo.name}</p>
      </Link>
    </div>
  );
}
