import { TodoItem } from '@/utils/schemas';
import TodoListItem from './TodoListItem';

interface TodoListProps {
  todos: TodoItem[];
}

export default function TodoList({ todos }: TodoListProps) {
  return todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />);
}
