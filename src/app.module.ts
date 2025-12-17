import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProfileModule } from './admin-profile/admin-profile.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClinicUserRoleModule } from './old/clinic-user-role/clinic-user-role.module';
import { ClinicsModule } from './clinics/clinics.module';
import { PatientProfileModule } from './patient-profile/patient-profile.module';
import { PsychologistProfileModule } from './psychologist-profile/psychologist-profile.module';
import { UsersModule } from './users/users.module';
import { ClinicStaffModule } from './clinic-staff/clinic-staff.module';
import { ClinicPsychologistService } from './clinic-psychologists/clinic-psychologist.service';
import { ClinicPsychologistModule } from './clinic-psychologists/clinic-psychologist.module';
import { ClinicPatientModule } from './clinic-patients/clinic-patient.module';
import { StaffProfileModule } from './staff-profile/staff-profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      // password: '-*A)CN0gjq]77ZNA',
      database: 'agendapsico',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ClinicsModule,
    ClinicUserRoleModule,
    PsychologistProfileModule,
    PatientProfileModule,
    AdminProfileModule,
    ClinicStaffModule,
    ClinicPsychologistModule,
    ClinicPatientModule,
    StaffProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClinicPsychologistService],
})
export class AppModule { }
