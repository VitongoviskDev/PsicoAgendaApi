import { Test, TestingModule } from '@nestjs/testing';
import { ClinicStaffController } from './clinic-staff.controller';

describe('ClinicStaffController', () => {
  let controller: ClinicStaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicStaffController],
    }).compile();

    controller = module.get<ClinicStaffController>(ClinicStaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
