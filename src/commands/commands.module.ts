import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeleteUserCommand } from './delete-user.command';
import { ResetDatabaseCommand } from './reset-db.command';
import { User } from '@/users/entities/user.entity';
import { UserClinic } from '@/user-clinic/entities/user-clinic.entity';
import { PsychologistProfile } from '@/psychologist-profile/entities/psychologist-profile.entity';
import { StaffProfile } from '@/staff-profile/entities/staff-profile.entity';
import { PatientProfile } from '@/patient-profile/entities/patient-profile.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            UserClinic,
            PsychologistProfile,
            StaffProfile,
            PatientProfile,
        ]),
    ],
    providers: [DeleteUserCommand, ResetDatabaseCommand],
})
export class CommandsModule { }
