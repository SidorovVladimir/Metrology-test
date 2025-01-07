import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
    private readonly configService: ConfigService,
  ) {}

  async findImageByQuestionId(questionId: number): Promise<Image> {
    try {
      return this.imagesRepository.findOne({
        where: { question_id: questionId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async createImage(
    file: Express.Multer.File,
    questionId: number,
  ): Promise<Image> {
    try {
      const image = new Image();
      image.question_id = questionId;
      const port = this.configService.get('port');
      const url = `http://localhost:${port}/${file.path}`;
      image.image_url = url;
      image.image_path = file.path;
      await this.imagesRepository.save(image);
      return image;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteImage(questionId: number): Promise<void> {
    try {
      const image = await this.findImageByQuestionId(questionId);
      if (image) {
        const imagePath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          image.image_path,
        );
        fs.unlink(imagePath, (err) => {
          if (err) {
            throw new Error(`Error removing image: ${err}`);
          }
        });
      }
      await this.imagesRepository.delete({ question_id: questionId });
    } catch (e) {
      throw new Error(e);
    }
  }
}
