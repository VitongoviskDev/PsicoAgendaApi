import { Test, TestingModule } from '@nestjs/testing';
import { ClinicPsychologistService } from './clinic-psychologist.service';

describe('ClinicPsychologistService', () => {
  let service: ClinicPsychologistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicPsychologistService],
    }).compile();

    service = module.get<ClinicPsychologistService>(ClinicPsychologistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
