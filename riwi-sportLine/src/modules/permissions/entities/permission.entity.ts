import { Entity, PrimaryGeneratedColumn, ManyToMany, Column } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}
