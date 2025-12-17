import { Test, TestingModule } from '@nestjs/testing';
import { StaffProfileService } from './staff-profile.service';

describe('StaffProfileService', () => {
  let service: StaffProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffProfileService],
    }).compile();

    service = module.get<StaffProfileService>(StaffProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
