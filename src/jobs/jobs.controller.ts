import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job.dto';
import { IdExceptionFilter } from './exceptions/id-exception.filter';
import { JobsService } from './jobs.service';
import { createJobSchema } from './joi/create-job.schema';
import { JoiValidationPipe } from './pipes/job-validation.pipe';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createJobSchema))
  createJob(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.createJob(createJobDto);
  }

  @Get('/:id')
  @UseFilters(IdExceptionFilter)
  findJobById(@Param('id') id: number) {
    return this.jobsService.findJobById(id);
  }
}
