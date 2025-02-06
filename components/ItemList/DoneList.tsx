import { TodoItem } from '@/utils/schemas';
import Image from 'next/image';

/**
 * isCompleted === true인 리스트
 */
interface DoneListProps {
  todos: TodoItem[];
}

export default function DoneList({ todos }: DoneListProps) {
  return todos.map((a) => {
    return (
      <div
        key={a.id}
        className="w-full m-3 p-3 bg-violet-100 rounded-full flex items-center border-2 border-slate-900 gap-4"
      >
        <Image src={'/ic/done.svg'} alt="todo-list" width={32} height={32} />
        <p>{a.name}</p>
      </div>
    );
  });
}
