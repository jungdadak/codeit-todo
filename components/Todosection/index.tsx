import { getAllTodos } from '@/utils/getAllTodos';
import TodoSectionClient from './client';

interface TodoSectionProps {
  type: 'todo' | 'done';
}

export default async function TodoSection({ type }: TodoSectionProps) {
  const todos = await getAllTodos().then((res) => ('error' in res ? [] : res));

  return <TodoSectionClient type={type} initialData={todos} />;
}
