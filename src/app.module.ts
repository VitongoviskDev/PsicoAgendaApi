import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { UserClinicModule } from './user-clinic/user-clinic.module';
import { ClinicsModule } from './clinics/clinics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: false,
      ssl: {
        rejectUnauthorized: false,
      },

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
