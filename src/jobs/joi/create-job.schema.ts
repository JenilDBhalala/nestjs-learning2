import * as joi from 'joi';
import { JobType } from '../constants/jobs.constants';

export const createJobSchema = joi.object({
  companyName: joi.string().required(),
  title: joi.string().required(),
  email: joi.string().email().required(),
  type: joi.string().valid(...Object.keys(JobType)),
  experience: joi.number().integer().required(),
  salary: joi.number().integer().required(),
  tags: joi.array().items(joi.string()).min(0),
  isActive: joi.boolean(),
});
