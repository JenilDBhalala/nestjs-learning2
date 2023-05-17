import { JobType } from '../constants/jobs.constants';

export class CreateJobDto {
  companyName: string;
  title: string;
  email: string;
  type?: JobType;
  experience: number;
  salary: number;
  tags?: string[];
  isActive?: boolean;
}
