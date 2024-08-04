import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { uuid } from '@/utils';

import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@Entity('categories')
export class Category {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn()
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: true })
  @IsString()
  @IsNotEmpty()
  icon_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Type(() => Date)
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Type(() => Date)
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Type(() => Date)
  deleted_at: Date;
}
