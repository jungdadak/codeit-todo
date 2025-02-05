import DoneEmpty from '@/components/Empty/DoneEmpty';
import TodoEmpty from '@/components/Empty/TodoEmpty';
import SearchBox from '@/components/SearchBox/SearchBox';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-slate-900">
      <SearchBox />
      <div className="flex flex-col lg:flex-row justify-center gap-2 mt-10">
        <section className="text-center w-full lg:w-1/2">
          <Image src={'/img/todo.svg'} alt="todo" width={101} height={36} />
          <TodoEmpty />
        </section>
        <section className="text-center w-full lg:w-1/2">
          <Image src={'/img/done.svg'} alt="done" width={101} height={36} />
          <DoneEmpty />
        </section>
      </div>
    </div>
  );
}
