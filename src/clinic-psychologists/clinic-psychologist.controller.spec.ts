import { Test, TestingModule } from '@nestjs/testing';
import { ClinicPsychologistController } from '@/clinic-psychologists/clinic-psychologist.controller';

describe('ClinicPsychologistController', () => {
  let controller: ClinicPsychologistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicPsychologistController],
    }).compile();

    controller = module.get<ClinicPsychologistController>(ClinicPsychologistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
