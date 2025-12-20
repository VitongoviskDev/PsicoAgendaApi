import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClinicsModule } from './clinics/clinics.module';
import { PatientProfileModule } from './patient-profile/patient-profile.module';
import { PsychologistProfileModule } from './psychologist-profile/psychologist-profile.module';
import { UsersModule } from './users/users.module';
import { ClinicStaffModule } from './clinic-staff/clinic-staff.module';
import { ClinicPsychologistModule } from './clinic-psychologists/clinic-psychologist.module';
import { ClinicPatientModule } from './clinic-patients/clinic-patient.module';
import { StaffProfileModule } from './staff-profile/staff-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,

      ssl: {
        rejectUnauthorized: false,
      },

      autoLoadEntities: true,
      synchronize: false,
    }),


    AuthModule,
    UsersModule,
    ClinicsModule,
    PsychologistProfileModule,
    PatientProfileModule,
    StaffProfileModule,
    ClinicStaffModule,
    ClinicPsychologistModule,
    ClinicPatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
