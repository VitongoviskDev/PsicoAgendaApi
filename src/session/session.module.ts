import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Session } from './entities/session.entity';
import { SessionHistory } from './entities/session-history.entity';
import { ActivityLogModule } from '@/activity-log/activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, SessionHistory]),
    ActivityLogModule,
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule { }
