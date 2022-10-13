
type TaskRequestDto = {
  title: string;
  description: string;
  date: Date;
  hour: string;
};

type TaskUpdateRequestDto = {
  title?: string;
  date?: Date;
  hour?: string;
  done?: boolean;
}
export { TaskRequestDto, TaskUpdateRequestDto };
