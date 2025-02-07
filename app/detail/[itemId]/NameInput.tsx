import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

//props 타입정의
interface NameInputProps {
  initialName: string;
  isCompleted: boolean;
  onNameChange: (name: string) => void;
  onBlurSave?: () => void;
  onToggleCompleted: () => void;
}

// 디테일 페이지 상단의 name, isCompleted 관련 변경하는 컴포넌트 입니다.
const NameInput = ({
  initialName,
  isCompleted,
  onNameChange,
  onToggleCompleted,
  onBlurSave,
}: NameInputProps) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  /**
   * 글자수 변경함수 입니다. 글자수 제한도 체크합니다.
   */
  const handleNameChange = (value: string) => {
    setName(value);
    if (value.length < 3) {
      setError('3글자 이상 입력해주세요');
    } else {
      setError('');
    }
    onNameChange(value);
  };

  /**
   * 키보드로 엔터키로 입력하거나 벗어나는 경우 입력모드를 비활성화 합니다.
   * name은 글자수 제한이 있으므로 충족하지 않을 경우 변경을 취소합니다.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !error && name.length >= 3) {
      setIsEditing(false);
      onBlurSave?.();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setName(initialName);
      onNameChange(initialName);
    }
  };

  /**
   * 글자수를 검증하고 이상이 없는 경우 편집모드를 취소하고 저장합니다.
   */
  const handleBlur = () => {
    if (!error && name.length >= 3) {
      setIsEditing(false);
      onBlurSave?.();
    } else if (name.length < 3) {
      toast({
        variant: 'destructive',
        description: '3글자 이상 입력해주세요',
      });
      setName(initialName);
      onNameChange(initialName);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`${
        isCompleted ? 'bg-violet-100' : 'bg-slate-100'
      } rounded-3xl flex flex-col items-center justify-center border-2 border-slate-900 py-3 px-4 w-full`}
    >
      <div className="flex items-center justify-center w-full">
        <Image
          src={isCompleted ? '/ic/done.svg' : '/ic/todo.svg'}
          alt="todo-list"
          width={32}
          height={32}
          className="cursor-pointer"
          onClick={onToggleCompleted}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="text-xl ml-4 bg-transparent border-b-2 border-slate-400 focus:outline-none focus:border-slate-600 w-full"
            minLength={3}
          />
        ) : (
          <h1
            className="text-xl ml-4 underline cursor-pointer hover:text-slate-600 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            {name}
          </h1>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default NameInput;
