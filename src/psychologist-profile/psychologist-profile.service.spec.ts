import { Test, TestingModule } from '@nestjs/testing';
import { PsychologistProfileService } from '@/psychologist-profile/psychologist-profile.service';

describe('PsychologistProfileService', () => {
  let service: PsychologistProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsychologistProfileService],
    }).compile();

    service = module.get<PsychologistProfileService>(PsychologistProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
