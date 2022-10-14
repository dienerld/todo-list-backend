
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
export { TaskRequestDto, TaskUpdateRequestDto };
