import { IsNumber, IsString } from 'class-validator';
import { Question } from 'src/modules/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class Image {
  @IsNumber()
  @PrimaryGeneratedColumn()
  image_id: number;

  @IsString()
  @Column('text')
  image_url: string;

  @IsString()
  @Column('text')
  title: string;

  @IsNumber()
  @Column()
  question_id: number;

  @OneToOne('Question')
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @CreateDateColumn()
  created_at: string;
}
