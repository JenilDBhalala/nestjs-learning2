import { Injectable, UseFilters } from '@nestjs/common';
import { IdException } from './exceptions/id-exceptions';
import { CreateJobDto } from './dtos/create-job.dto';
import { Job } from './interfaces/job';

const JOBS = new Map<number, Job>();
let jobId = 1;

@Injectable()
export class JobsService {
  createJob(createJobDto: CreateJobDto) {
    const job = Object.assign({ ...createJobDto, id: jobId++ }, new Job());

    JOBS.set(job.id, job);
    return job;
  }

  findJobById(id: number) {
    if (id < 0) {
      throw new IdException();
    }
    return { id };
  }
}
