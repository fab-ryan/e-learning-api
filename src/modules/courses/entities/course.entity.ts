import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

import { IsString, IsNotEmpty } from 'class-validator';
import { uuid } from '@/utils';

import { User } from '@/modules/user/entities/user.entity';
import { Category } from '@/modules/category/entities/category.entity';

@Entity('courses')
export class Course {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn()
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @IsString()
  @Unique('slug', ['slug'], {
    deferrable: 'INITIALLY DEFERRED',
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @Column({
    type: 'enum',
    enum: ['USD', 'EUR', 'RFW'],
    default: 'USD',
  })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @Column({ nullable: false, default: false })
  isFree: boolean;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, default: false })
  featured: boolean;

  @ManyToOne(() => User, (user) => user.id)
  teacher: User;

  @OneToOne(() => Category, (category) => category.id)
  category: Category;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
