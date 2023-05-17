import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IdException } from 'src/exceptions/id-exceptions';
import { CreateJobDto } from './dtos/create-job.dto';
import { Job } from './interfaces/job';

const JOBS = new Map<number, Job>();
let jobId = 1;

@Injectable()
export class JobsService {
  createJob(createJobDto: CreateJobDto) {
    // console.log(createJobDto);
    const job = Object.assign({ ...createJobDto, id: jobId++ }, new Job());

    JOBS.set(job.id, job);
    return job;
  }

  findJobById(id: number) {
    console.log('hello');
    if (id < 0) {
      throw new IdException();
    }
    return { id };
  }
}
