import { Injectable } from '@nestjs/common';
import { JobApplication } from './job-application.model';
import { applicationsFixture } from './job-application.fixtures';
// import { filterApplicationByStatus, getApplicationsByMonth } from '../utils/helper.utils';

@Injectable()
export class JobApplicationService {
  private applications: JobApplication[] = applicationsFixture;

  getAllApplications() {
    try {
      const applications = this.applications;
      return {
        message: 'successful',
        data: applications,
      };
    } catch (error) {
      return {
        message: 'failed',
        data: error.message,
      };
    }
  }

  getStats() {
    try {
      const totalApplications = this.applications.length;
      const countByStatus = {
        pending: Helper.filterApplicationByStatus(this.applications, "pending")?.length,
        accepted: Helper.filterApplicationByStatus(this.applications, "accepted")?.length,
        rejected: Helper.filterApplicationByStatus(this.applications, "rejected")?.length,
        // pending: filterApplicationByStatus(this.applications, "pending")?.length,
        // accepted: filterApplicationByStatus(this.applications, "accepted")?.length,
        // rejected: filterApplicationByStatus(this.applications, "rejected")?.length,
      };

      // const countByMonth = getApplicationsByMonth(this.applications); 

      const countByMonth = Helper.getApplicationsByMonth(this.applications); 

      return {
        message: 'successful',
        data: {
          total: totalApplications,
          countByStatus,
          countByMonth,
        },
      };
    } catch (error) {
      return {
        message: 'failed',
        data: error.message,
      };
    }
  }
}
