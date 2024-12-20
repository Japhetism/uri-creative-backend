import { JobApplicationService } from './job-application.service';
export declare class JobApplicationController {
    private readonly applicationsService;
    constructor(applicationsService: JobApplicationService);
    getAllApplications(): {
        message: string;
        data: any;
    };
    getStats(): {
        message: string;
        data: any;
    };
}
