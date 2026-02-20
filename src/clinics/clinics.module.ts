import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsController } from '@/clinics/clinics.controller';
import { ClinicsService } from '@/clinics/clinics.service';
import { Clinic } from '@/clinics/entity/clinic.entity';
import { User } from '@/users/entities/user.entity';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clinic,
      User
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [ClinicsService]
})
export class ClinicsModule { }
