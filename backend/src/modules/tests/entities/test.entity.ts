import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @CreateDateColumn()
  created_at: string;
}
