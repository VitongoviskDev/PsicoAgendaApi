import { Clinic } from "@/clinics/entity/clinic.entity";
import { AuditableEntity } from "@/common/entities/auditable.entity";
import { PatientProfile } from "@/patient-profile/entities/patient-profile.entity";
import { PsychologistProfile } from "@/psychologist-profile/entities/psychologist-profile.entity";
import { StaffProfile } from "@/staff-profile/entities/staff-profile.entity";
import { User } from "@/users/entities/user.entity";
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('user_clinics')
@Unique(['user', 'clinic'])
export class UserClinic extends AuditableEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userClinics, {
        cascade: true,
    })
    user: User;

    @ManyToOne(() => Clinic, (clinic) => clinic.userClinics, {
        cascade: true,
    })
    clinic: Clinic;

    @OneToOne(() => PatientProfile, (patientProfile) => patientProfile.userClinics, {
        cascade: true,
        nullable: true,
    })
    patientProfile: PatientProfile;

    @OneToOne(() => StaffProfile, (staffProfile) => staffProfile.userClinics, {
        cascade: true,
        nullable: true,
    })
    staffProfile: StaffProfile;
}
