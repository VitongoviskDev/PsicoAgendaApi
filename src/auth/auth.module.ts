import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ClinicsModule } from '@/clinics/clinics.module';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { PsychologistProfileModule } from '@/psychologist-profile/psychologist-profile.module';
import { ClinicStaffModule } from '@/clinic-staff/clinic-staff.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ClinicsModule,
    ClinicStaffModule,
    PsychologistProfileModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule { }
