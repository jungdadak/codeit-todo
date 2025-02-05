import { TodoItem } from '@/utils/schemas';
import Image from 'next/image';

/**
 * props 타입은 zod infer타입 재사용
 * isCompleted === false 인 값만 들어오지만 검증하면 가독성 저하
 */
interface TodoListProps {
  todos: TodoItem[];
}

/**
 * map 함수로 props를 받아오기.
 * id는 키로, 이름값만 필요
 */
export default function TodoList({ todos }: TodoListProps) {
  return todos.map((a) => {
    return (
      <div
        key={a.id}
        className="w-full p-3 bg-slate-100 rounded-full flex items-center border-2 border-slate-900 gap-4"
      >
        <Image src={'/ic/todo.svg'} alt="todo-list" width={32} height={32} />
        <p>{a.name}</p>
      </div>
    );
  });
}
