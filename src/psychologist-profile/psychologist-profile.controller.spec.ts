import { Test, TestingModule } from '@nestjs/testing';
import { PsychologistProfileController } from '@/psychologist-profile/psychologist-profile.controller';

describe('PsychologistProfileController', () => {
  let controller: PsychologistProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsychologistProfileController],
    }).compile();

    controller = module.get<PsychologistProfileController>(PsychologistProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
