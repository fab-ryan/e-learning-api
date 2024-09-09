import { uuid } from '@/utils';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Category } from '@/modules/category/entities/category.entity';

@Entity('user_categories')
export class UserCategory {
  constructor() {
    this.id = uuid();
  }
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.userCategories)
  user: User;

  @ManyToOne(() => Category, (category) => category.userCategories)
  category: Category;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
