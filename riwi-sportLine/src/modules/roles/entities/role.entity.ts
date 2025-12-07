import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolesPermission } from 'src/modules/roles-permissions/entities/roles-permission.entity';
import { UsersRole } from 'src/modules/users-roles/entities/users-role.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => RolesPermission, (rp) => rp.role)
  permissions: RolesPermission[];

  @OneToMany(() => UsersRole, (userRole) => userRole.role)
  users: UsersRole[];
}
