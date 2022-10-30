
type TTask = {
  id: string;
  title: string;
  done: boolean;
  date: Date;
  hidden: boolean;
  hour: string;
}

type TaskRequestDto = {
  title: string;
  date: Date;
  hour: string;
};

type TaskUpdateRequestDto = {
  title?: string;
  date?: Date;
  hour?: string;
  done?: boolean;
  hidden?: boolean;
}

export { TaskRequestDto, TaskUpdateRequestDto, TTask };
