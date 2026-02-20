import { Clinic } from "@/clinics/entity/clinic.entity";
import { AuditableEntity } from "@/common/entities/auditable.entity";
import { PatientProfile } from "@/patient-profile/entities/patient-profile.entity";
import { PsychologistProfile } from "@/psychologist-profile/entities/psychologist-profile.entity";
import { StaffProfile } from "@/staff-profile/entities/staff-profile.entity";
import { User } from "@/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @OneToOne(() => PatientProfile, (patientProfile) => patientProfile.userClinic, {
        cascade: true,
        nullable: true,
    })
    @JoinColumn({ name: 'patient_profile_id' })
    patientProfile: PatientProfile;

    @OneToOne(() => StaffProfile, (staffProfile) => staffProfile.userClinic, {
        cascade: true,
        nullable: true,
    })
    @JoinColumn({ name: 'staff_profile_id' })
    staffProfile: StaffProfile;

    @ManyToOne(() => PsychologistProfile, (psychologistProfile) => psychologistProfile.userClinics, {
        cascade: true,
        nullable: true,
    })
    @JoinColumn({ name: 'psychologist_profiles_id' })
    psychologistProfile: PsychologistProfile;
}
