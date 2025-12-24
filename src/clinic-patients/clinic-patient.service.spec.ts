import { Test, TestingModule } from '@nestjs/testing';
import { ClinicPatientService } from '@/clinic-patients/clinic-patient.service';

describe('ClinicPatientService', () => {
  let service: ClinicPatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicPatientService],
    }).compile();

    service = module.get<ClinicPatientService>(ClinicPatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
