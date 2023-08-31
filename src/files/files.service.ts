import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class FilesService {
  constructor(
    @InjectQueue('files')
    private readonly filesQueue: Queue,
  ) {}

  async addFileProcessingJob(file): Promise<void> {
    await this.filesQueue.add('process-file', file);
  }
}
