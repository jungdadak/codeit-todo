import { getAllTodos } from '@/utils/getAllTodos';
import TodoList from '@/components/ItemList/TodoList';
import DoneList from '@/components/ItemList/DoneList';
import TodoEmpty from '@/components/Empty/TodoEmpty';
import DoneEmpty from '@/components/Empty/DoneEmpty';

interface TodoSectionProps {
  type: 'todo' | 'done';
}

/**
 * 부모 컴포넌트에서 이 컴포넌트 ( 함수 ) 에 type을 적절히 넘겨주면 복잡도 감소
 * todo, done 배열을 구분하고, empty인지 아닌지만 판단하여 랜더링
 */

export default async function TodoSection({ type }: TodoSectionProps) {
  const todos = await getAllTodos().then((res) => ('error' in res ? [] : res));

  /**
   * props로 받은 type에 따라 todo인 경우 isCompleted ===false 인 배열반환
   * done 타입이면 true인 배열 반환
   */
  const filteredTodos = todos.filter((todo) =>
    type === 'todo' ? !todo.isCompleted : todo.isCompleted
  );

  return (
    <div>
      {/* 반환된 배열이 empty면 empty 반환, 아니면 리스트에 담아서 반환 */}
      {filteredTodos.length === 0 ? (
        type === 'todo' ? (
          <TodoEmpty />
        ) : (
          <DoneEmpty />
        )
      ) : type === 'todo' ? (
        <TodoList todos={filteredTodos} />
      ) : (
        <DoneList todos={filteredTodos} />
      )}
    </div>
  );
}
