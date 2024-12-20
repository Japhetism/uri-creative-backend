"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationService = void 0;
const common_1 = require("@nestjs/common");
const job_application_fixtures_1 = require("./job-application.fixtures");
const helper_utils_1 = require("../utils/helper.utils");
let JobApplicationService = class JobApplicationService {
    constructor() {
        this.applications = job_application_fixtures_1.applicationsFixture;
    }
    getAllApplications() {
        try {
            const applications = this.applications;
            return {
                message: 'successful',
                data: applications,
            };
        }
        catch (error) {
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
                pending: (0, helper_utils_1.filterApplicationByStatus)(this.applications, "pending")?.length,
                accepted: (0, helper_utils_1.filterApplicationByStatus)(this.applications, "accepted")?.length,
                rejected: (0, helper_utils_1.filterApplicationByStatus)(this.applications, "rejected")?.length,
            };
            const countByMonth = (0, helper_utils_1.getApplicationsByMonth)(this.applications);
            return {
                message: 'successful',
                data: {
                    total: totalApplications,
                    countByStatus,
                    countByMonth,
                },
            };
        }
        catch (error) {
            return {
                message: 'failed',
                data: error.message,
            };
        }
    }
};
exports.JobApplicationService = JobApplicationService;
exports.JobApplicationService = JobApplicationService = __decorate([
    (0, common_1.Injectable)()
], JobApplicationService);
//# sourceMappingURL=job-application.service.js.map