import { Test, TestingModule } from '@nestjs/testing';
import { ClinicPatientController } from './clinic-patient.controller';

describe('ClinicPatientController', () => {
  let controller: ClinicPatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicPatientController],
    }).compile();

    controller = module.get<ClinicPatientController>(ClinicPatientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
