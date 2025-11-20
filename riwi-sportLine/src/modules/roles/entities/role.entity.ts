import { Entity, PrimaryGeneratedColumn, ManyToMany, Column, JoinTable } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Permission } from "../../permissions/entities/permission.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable()
    permissions: Permission[];

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
