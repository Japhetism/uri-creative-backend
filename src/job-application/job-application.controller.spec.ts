import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { applicationsFixture } from './job-application.fixtures';
import { filterApplicationByStatus, getApplicationsByMonth } from '../utils/helper.utils';

export interface StatsResponse {
  total: number;
  countByStatus: {
    pending: number;
    accepted: number;
    rejected: number;
  };
  countByMonth: {
    [key: string]: number;
  };
}


describe('JobApplicationController', () => {
  let controller: JobApplicationController;
  let service: JobApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobApplicationController],
      providers: [JobApplicationService],
    }).compile();

    controller = module.get<JobApplicationController>(JobApplicationController);
    service = module.get<JobApplicationService>(JobApplicationService);
  });

  it('should return all applications', () => {
    jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'successful',
      data: applicationsFixture,
    }));

    expect(controller.getAllApplications()).toEqual({
      message: 'successful',
      data: applicationsFixture,
    });
  });

  it('should return the correct number of applications', () => {
    jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'successful',
      data: applicationsFixture,
    }));

    const result = controller.getAllApplications();
    expect(result.data.length).toBe(applicationsFixture.length);
  });

  it('should return status 200 and valid response shape', async () => {
    jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'successful',
      data: applicationsFixture,
    }));
  
    const response = await controller.getAllApplications();
    expect(response).toHaveProperty('message', 'successful');
    expect(response).toHaveProperty('data');
    expect(response.data.length).toBe(applicationsFixture.length);
  });

  it('should call service.getAllApplications once', async () => {
    const spy = jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'successful',
      data: applicationsFixture,
    }));

    await controller.getAllApplications();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return empty applications when there are no applications', () => {
    jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'successful',
      data: [],
    }));
  
    const result = controller.getAllApplications();
    expect(result.message).toBe('successful');
    expect(result.data).toEqual([]);
    expect(result.data.length).toBe(0);
  });

  it('should return an error message when service fails', () => {
    jest.spyOn(service, 'getAllApplications').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
  
    try {
      controller.getAllApplications();
    } catch (error) {
      expect(error.message).toBe('Internal Server Error');
    }
  });

  it('should call service.getAllApplications once', async () => {
    const spy = jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'successful',
      data: applicationsFixture,
    }));
  
    await controller.getAllApplications();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('should return the applications with expected fields', () => {
    jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'successful',
      data: applicationsFixture,
    }));
  
    const result = controller.getAllApplications();
    expect(result.data).toEqual(applicationsFixture);
    expect(result.data[0]).toHaveProperty('id');
    expect(result.data[0]).toHaveProperty('companyName');
    expect(result.data[0]).toHaveProperty('dateApplied');
    expect(result.data[0]).toHaveProperty('jobTitle');
    expect(result.data[0]).toHaveProperty('status');
  });

  it('should handle pagination correctly', () => {
    jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'successful',
      data: applicationsFixture.slice(0, 2),
    }));
  
    const result = controller.getAllApplications();
    expect(result.data.length).toBe(2);
  });
  
  it('should return a "no applications found" message if no applications exist', () => {
    jest.spyOn(service, 'getAllApplications').mockImplementation(() => ({
      message: 'no applications found',
      data: [],
    }));
  
    const result = controller.getAllApplications();
    expect(result.message).toBe('no applications found');
    expect(result.data.length).toBe(0);
  });
  
});

describe('JobApplicationController - Stats', () => {
  let controller: JobApplicationController;
  let service: JobApplicationService;

  const mockStats: StatsResponse = {
    total: applicationsFixture.length,
    countByStatus: {
      pending: filterApplicationByStatus(applicationsFixture, 'pending'),
      accepted: filterApplicationByStatus(applicationsFixture, 'accepted'),
      rejected: filterApplicationByStatus(applicationsFixture, 'rejected')
    },
    countByMonth: getApplicationsByMonth(applicationsFixture)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobApplicationController],
      providers: [JobApplicationService],
    }).compile();

    controller = module.get<JobApplicationController>(JobApplicationController);
    service = module.get<JobApplicationService>(JobApplicationService);
  });

  it('should return application stats with correct structure', async () => {
    jest.spyOn(service, 'getStats').mockImplementation(() => ({
      message: 'successful',
      data: mockStats,
    }));


    const result = await controller.getStats();
    
    expect(result).toEqual({
      message: 'successful',
      data: mockStats
    });

  });

  it('should return the correct total number of applications', async () => {
    jest.spyOn(service, 'getStats').mockImplementation(() => ({
      message: 'successful',
      data: mockStats,
    }));

    const result = await controller.getStats();
    expect(result.data.total).toBe(applicationsFixture.length);
  });

  it('should return the correct count by status', async () => {
    jest.spyOn(service, 'getStats').mockImplementation(() => ({
      message: 'successful',
      data: mockStats,
    }));

    const result = await controller.getStats();
    expect(result.data.countByStatus).toEqual({
      pending: filterApplicationByStatus(applicationsFixture, 'pending'),
      accepted: filterApplicationByStatus(applicationsFixture, 'accepted'),
      rejected: filterApplicationByStatus(applicationsFixture, 'rejected')
    });
  });

  it('should return the correct count by month', async () => {
    jest.spyOn(service, 'getStats').mockImplementation(() => ({
      message: 'successful',
      data: mockStats,
    }));

    const result = await controller.getStats();
    expect(result.data.countByMonth).toEqual(getApplicationsByMonth(applicationsFixture));
  });
});

