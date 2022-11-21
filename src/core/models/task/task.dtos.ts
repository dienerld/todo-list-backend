
type TTask = {
  id: string;
  title: string;
  done: boolean;
  date: Date;
  hidden: boolean;
  hour: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

type TaskRequestDto = {
  title: string;
  date: Date;
  hour: string;
};

type TaskUpdateRequestDto = Omit<TTask, 'id'| 'created_at' | 'updated_at'>

export { TaskRequestDto, TaskUpdateRequestDto, TTask };
