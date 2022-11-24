import { appDataSource } from '@database/data-source';
import { userSchema } from '@database/schemas/user.schema';
import { User } from '@models/user/user.model';
import { IUserRepository } from '@models/user/userRepository.interface';
import { Repository } from 'typeorm';

class UserRepository implements IUserRepository {
  repository: Repository<User>;
  constructor () {
    this.repository = appDataSource.getRepository(userSchema);
  }

  async findById (id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail (email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async save (user: User): Promise<void> {
    await this.repository.save(user);
  }

  async update (user: User): Promise<void> {
    await this.repository.update(user.id, user);
  }

  async delete (id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByIdWithTasks (id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['tasks'],
      order: {
        tasks: { date: 'ASC', hour: 'ASC', created_at: 'ASC' }
      }
    });
  }
}

export { UserRepository };
