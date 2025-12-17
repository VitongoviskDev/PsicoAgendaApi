import { Test, TestingModule } from '@nestjs/testing';
import { StaffProfileController } from './staff-profile.controller';

describe('StaffProfileController', () => {
  let controller: StaffProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffProfileController],
    }).compile();

    controller = module.get<StaffProfileController>(StaffProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
