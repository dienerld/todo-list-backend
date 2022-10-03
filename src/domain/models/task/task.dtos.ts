import { TaskStatus } from './task.model';

type TaskRequestDto = {
  title: string;
  description: string;
};

type TaskUpdateRequestDto = {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
export { TaskRequestDto, TaskUpdateRequestDto };
