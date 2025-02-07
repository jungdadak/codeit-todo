'use client';

import { TodoItem } from '@/utils/schemas';
import Image from 'next/image';
import Link from 'next/link';
import { useTodoActions } from '@/utils/todoActions';

interface DoneListItemProps {
  todo: TodoItem;
}

export default function DoneListItem({ todo }: DoneListItemProps) {
  const { updateTodoStatus } = useTodoActions();

  return (
    <div className="w-full m-3 p-3 bg-violet-100 rounded-full flex items-center border-2 border-slate-900 gap-4">
      <button
        onClick={() => updateTodoStatus(todo)}
        className="hover:opacity-75 transition-opacity"
      >
        <Image src="/ic/done.svg" alt="mark as todo" width={32} height={32} />
      </button>
      <Link href={`/detail/${todo.id}`}>
        <p className="line-through">{todo.name}</p>
      </Link>
    </div>
  );
}
