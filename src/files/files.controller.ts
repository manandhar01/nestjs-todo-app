import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        // filename: (req, file) => file.originalname,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.filesService.addFileProcessingJob(file);

    return { message: 'File uploaded and processing started.' };
  }
}
