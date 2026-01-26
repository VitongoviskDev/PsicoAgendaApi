import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { UserClinicModule } from './user-clinic/user-clinic.module';
import { ClinicsModule } from './clinics/clinics.module';
import { dataSourceOptions } from './data-source';
import { PatientProfileModule } from './patient-profile/patient-profile.module';
import { StaffProfileModule } from './staff-profile/staff-profile.module';
import { PsychologistProfileModule } from './psychologist-profile/psychologist-profile.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: false,
      
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },

    }),

    AuthModule,

    UsersModule,
    ClinicsModule,
    UserClinicModule,
    PatientProfileModule,
    StaffProfileModule,
    PsychologistProfileModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
