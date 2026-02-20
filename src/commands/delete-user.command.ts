import { Injectable } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserClinic } from '../user-clinic/entities/user-clinic.entity';
import { PsychologistProfile } from '../psychologist-profile/entities/psychologist-profile.entity';
import { StaffProfile } from '../staff-profile/entities/staff-profile.entity';
import { PatientProfile } from '../patient-profile/entities/patient-profile.entity';
import { VerificationCode } from '../verification-code/entities/verification-code.entity';
import { Clinic } from '@/clinics/entity/clinic.entity';

@Command({
    name: 'delete:user',
    description: 'Remove um usuário e todas as suas relações do banco',
})
@Injectable()
export class DeleteUserCommand extends CommandRunner {
    constructor(private readonly dataSource: DataSource) {
        super();
    }

    async run(passedParams: string[], options?: Record<string, any>) {
        const userId = options?.id;

        if (!userId) {
            console.log('Informe o --id do usuário');
            return;
        }

        console.log(`Removendo usuário ${userId}...`);

        try {
            await this.dataSource.transaction(async (manager) => {
                const user = await manager.findOne(User, {
                    where: { id: userId },
                    relations: ['userClinics', 'userClinics.clinic', 'psychologistProfile', 'currentUserClinic'],
                });

                if (!user) {
                    console.log(`Usuário ${userId} não encontrado.`);
                    return;
                }

                // 1. Nullify connection to current clinic to avoid FK constraint issues if any
                if (user.currentUserClinic) {
                    await manager.update(User, { id: userId }, { currentUserClinic: null as any });
                }

                // 2. Delete Verification Codes
                await manager.delete(VerificationCode, { userId: userId });

                // 3. Collect Clinic IDs and handle related records
                const clinicIds = user.userClinics.map(uc => uc.clinic.id);

                for (const uc of user.userClinics) {
                    await manager.delete(StaffProfile, { userClinic: { id: uc.id } });
                    await manager.delete(PatientProfile, { userClinics: { id: uc.id } });
                }

                // 4. Delete User Clinic connections first (to free up the Clinic)
                if (user.userClinics.length > 0) {
                    await manager.delete(UserClinic, user.userClinics.map(uc => uc.id));
                }

                // 5. Now delete the Clinics
                for (const clinicId of [...new Set(clinicIds)]) {
                    await manager.delete(Clinic, { id: clinicId });
                }

                // 6. Delete Psychologist Profile
                if (user.psychologistProfile) {
                    await manager.delete(PsychologistProfile, { id: user.psychologistProfile.id });
                }

                // 7. Finally delete the user
                await manager.delete(User, { id: userId });
            });

            console.log('Usuário e todas as suas relações removidos com sucesso.');
        } catch (error) {
            console.error('Erro ao remover usuário:', error.message);
        }
    }

    @Option({
        flags: '--id <id>',
        description: 'ID do usuário a ser removido',
    })
    parseId(val: string) {
        return val;
    }
}
