import { TodoItem } from '@/utils/schemas';
import DoneListItem from './DoneListItem';

interface DoneListProps {
  todos: TodoItem[];
}

export default function DoneList({ todos }: DoneListProps) {
  return todos.map((todo) => <DoneListItem key={todo.id} todo={todo} />);
}
