import { Controller, Get } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';

@Controller('applications')
export class JobApplicationController {
  constructor(private readonly applicationsService: JobApplicationService) {}

  @Get()
  getAllApplications() {
    return this.applicationsService.getAllApplications();
  }

  @Get('stats')
  getStats() {
    return this.applicationsService.getStats();
  }
}
