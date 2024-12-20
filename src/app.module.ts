import { Module } from '@nestjs/common';
import { JobApplicationModule } from './job-application/job-application.module';

@Module({
  imports: [JobApplicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
