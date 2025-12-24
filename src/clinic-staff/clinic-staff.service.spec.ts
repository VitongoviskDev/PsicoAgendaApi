import { Test, TestingModule } from '@nestjs/testing';
import { ClinicStaffService } from '@/clinic-staff/clinic-staff.service';

describe('ClinicStaffService', () => {
  let service: ClinicStaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicStaffService],
    }).compile();

    service = module.get<ClinicStaffService>(ClinicStaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
