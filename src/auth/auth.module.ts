import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { JwtStrategy } from './jwt.strategy';
import { PsychologistProfileModule } from 'src/psychologist-profile/psychologist-profile.module';
import { ClinicStaffModule } from 'src/clinic-staff/clinic-staff.module';

@Module({
  imports: [
    UsersModule,
    ClinicsModule,
    ClinicStaffModule,
    PsychologistProfileModule,
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY',
      signOptions: { expiresIn: '24HOUR' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule { }
